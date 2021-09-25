<template>
  <div
    class="previewBox"
    :class="{ hide: hide, disabledEvents: disabledEvents }"
  >
    <iframe class="iframe" ref="iframeRef" :srcdoc="srcdoc"></iframe>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  computed,
  onBeforeUnmount,
  getCurrentInstance,
  watch,
} from "vue";
import { useStore } from "vuex";
import { assembleHtml, compile, compileVue } from "@/utils";
import { getTemplate } from "@/config/templates";
import { base } from "@/config";

// props
defineProps({
  hide: {
    type: Boolean,
    default: false,
  },
});

// hooks定义部分

// 初始化数据
const useInitData = () => {
  const { proxy } = getCurrentInstance();
  // vuex
  const store = useStore();
  // 数据
  const editData = computed(() => store.state.editData);
  const iframeRef = ref(null);
  const isNewWindowPreview = ref(false);
  const newWindowPreviewData = ref(null);
  const htmlLanguage = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.HTML.language
      : editData.value.code.HTML.language;
  });
  const jsLanguage = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.JS.language
      : editData.value.code.JS.language;
  });
  const cssLanguage = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.CSS.language
      : editData.value.code.CSS.language;
  });
  const htmlContent = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.HTML.content
      : editData.value.code.HTML.content;
  });
  const jsContent = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.JS.content
      : editData.value.code.JS.content;
  });
  const cssContent = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.CSS.content
      : editData.value.code.CSS.content;
  });
  const cssResources = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.CSS.resources
      : editData.value.code.CSS.resources;
  });
  const jsResources = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.JS.resources
      : editData.value.code.JS.resources;
  });
  const vueLanguage = computed(() => {
    return editData.value.code.VUE.language;
  });
  const vueContent = computed(() => {
    return editData.value.code.VUE.content;
  });

  return {
    proxy,
    store,
    editData,
    iframeRef,
    isNewWindowPreview,
    newWindowPreviewData,
    htmlLanguage,
    jsLanguage,
    cssLanguage,
    htmlContent,
    jsContent,
    cssContent,
    cssResources,
    jsResources,
    vueLanguage,
    vueContent,
  };
};

// 处理日志打印
const useLog = ({ iframeRef, proxy }) => {
  // 打印日志
  const log = (type, data) => {
    iframeRef.value.contentWindow.postMessage({
      type,
      data,
    });
  };

  proxy.$eventEmitter.on("log", log);

  return {
    log,
  };
};

// 处理生成html结构
const useCreateHtml = () => {
  // 生成html结构
  const createHtml = (
    htmlStr,
    jsStr,
    cssStr,
    cssResources,
    jsResources,
    openAlmightyConsole
  ) => {
    // 添加依赖资源
    let _cssResources = cssResources
      .map((item) => {
        return `<link href="${item.url}" rel="stylesheet">`;
      })
      .join("\n");
    let _jsResources = jsResources
      .map((item) => {
        return `<script src="${item.url}"><\/script>`;
      })
      .join("\n");
    let head = `
      <title>预览<\/title>
      <style type="text/css">
          ${cssStr}
      <\/style>
      ${_cssResources}
      <script src="${base}console/compile.js"><\/script>
    `;
    let body = `
      ${htmlStr}
      ${_jsResources}
      ${
        openAlmightyConsole
          ? `<script src="${base}eruda/eruda.js"><\/script>`
          : ""
      }
      <script>
          ${openAlmightyConsole ? "eruda.init();" : ""}
          try {
            ${jsStr}
          } catch (err) {
            console.error('js代码运行出错')
            console.error(err)
          }
      <\/script>
    `;
    return assembleHtml(head, body);
  };

  return {
    createHtml,
  };
};

// 处理运行
const useRun = ({
  store,
  isNewWindowPreview,
  newWindowPreviewData,
  editData,
  proxy,
  vueLanguage,
  vueContent,
  htmlLanguage,
  jsLanguage,
  cssLanguage,
  htmlContent,
  jsContent,
  cssContent,
  cssResources,
  jsResources,
  createHtml,
  log,
}) => {
  // 预览的文档内容
  const srcdoc = ref("");
  // 当前布局类型
  const layout = computed(() => {
    return store.state.editData.config.layout;
  });
  // 是否开启全能调试
  const openAlmightyConsole = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.config.openAlmightyConsole
      : editData.value.config.openAlmightyConsole;
  });
  // 重新运行时是否保留之前的日志
  const keepPreviousLogs = computed(() => {
    return editData.value.config.keepPreviousLogs;
  });
  // 运行
  const run = async () => {
    try {
      if (!keepPreviousLogs.value) {
        proxy.$eventEmitter.emit("clear_logs");
      }
      srcdoc.value = "";
      let _jsResourcesPlus = [];
      let _cssResourcesPlus = [];
      let compiledData = null;
      // vue单文件
      if (layout.value === "vue") {
        compiledData = await compileVue(vueLanguage.value, vueContent.value);
        if (compiledData) {
          // 自动引入vue资源
          _jsResourcesPlus = getTemplate(vueLanguage.value).code.JS.resources;
        } else {
          compiledData = {
            html: "",
            css: "",
            js: "",
          };
        }
      } else {
        compiledData = await compile(
          htmlLanguage.value,
          jsLanguage.value,
          cssLanguage.value,
          htmlContent.value,
          jsContent.value,
          cssContent.value
        );
      }
      let _cssResources = cssResources.value
        .map((item) => {
          return {
            ...item,
          };
        })
        .concat(_cssResourcesPlus);
      let _jsResources = jsResources.value
        .map((item) => {
          return {
            ...item,
          };
        })
        .concat(_jsResourcesPlus);
      srcdoc.value = createHtml(
        compiledData.html,
        compiledData.js,
        compiledData.css,
        _cssResources,
        _jsResources,
        openAlmightyConsole.value
      );
      isNewWindowPreview.value = false;
    } catch (error) {
      console.log(error);
      log("log_error", error.message);
    }
  };

  proxy.$eventEmitter.on("run", run);

  onBeforeUnmount(() => {
    proxy.$eventEmitter.off("run", run);
  });

  // 全能调试配置修改后重新运行
  watch(() => {
    return editData.value.config.openAlmightyConsole;
  }, run);

  return {
    srcdoc,
    run,
  };
};

// 新开窗口预览模式处理
const useNewWindowPreview = ({
  newWindowPreviewData,
  isNewWindowPreview,
  run,
}) => {
  // 新开窗口预览模式接收预览通知
  window.addEventListener("message", ({ data = {} }) => {
    if (data.type === "preview") {
      newWindowPreviewData.value = data.data;
      isNewWindowPreview.value = true;
      run();
    }
  });
};

// 处理拖动
const useDrag = ({ proxy }) => {
  const disabledEvents = ref(false);

  // 拖动开始禁止响应iframe的鼠标事件，否则父页面不会触发鼠标事件导致拖动存在bug
  const onDragStart = () => {
    disabledEvents.value = true;
  };

  // 拖动结束解除禁止
  const onDragOver = () => {
    disabledEvents.value = false;
  };

  proxy.$eventEmitter.on("dragStart", onDragStart);
  proxy.$eventEmitter.on("dragOver", onDragOver);

  onBeforeUnmount(() => {
    proxy.$eventEmitter.off("dragStart", onDragStart);
    proxy.$eventEmitter.off("dragOver", onDragOver);
  });

  return {
    disabledEvents,
  };
};

// 处理动态执行js
const useDynamicRunJs = ({ iframeRef, proxy }) => {
  // 动态执行js
  const dynamicRunJs = (code) => {
    iframeRef.value.contentWindow.postMessage({
      type: "command",
      data: code,
    });
  };

  proxy.$eventEmitter.on("dynamic_js_command", dynamicRunJs);
  onBeforeUnmount(() => {
    proxy.$eventEmitter.off("dynamic_js_command", dynamicRunJs);
  });
};

// created部分
const {
  proxy,
  store,
  editData,
  iframeRef,
  isNewWindowPreview,
  newWindowPreviewData,
  htmlLanguage,
  jsLanguage,
  cssLanguage,
  htmlContent,
  jsContent,
  cssContent,
  cssResources,
  jsResources,
  vueLanguage,
  vueContent,
} = useInitData();
const { log } = useLog({ iframeRef, proxy });
const { createHtml } = useCreateHtml();
const { srcdoc, run } = useRun({
  store,
  isNewWindowPreview,
  newWindowPreviewData,
  editData,
  proxy,
  vueLanguage,
  vueContent,
  htmlLanguage,
  jsLanguage,
  cssLanguage,
  htmlContent,
  jsContent,
  cssContent,
  cssResources,
  jsResources,
  createHtml,
  log,
});
useNewWindowPreview({ newWindowPreviewData, isNewWindowPreview, run });
const { disabledEvents } = useDrag({ proxy });
useDynamicRunJs({ iframeRef, proxy });
</script>

<style scoped lang="less">
.previewBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &.hide {
    display: none;
  }

  &.disabledEvents {
    pointer-events: none;
  }

  .iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
