<template>
  <div
    class="previewBox"
    :class="{ hide: hide, disabledEvents: disabledEvents }"
  >
    <iframe 
      class="iframe" 
      ref="iframeRef" 
      :srcdoc="srcdoc" 
      :style="iframeStyle"
    ></iframe>
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

const dev = process.env.NODE_ENV !== "production";

// props
const props = defineProps({
  hide: {
    type: Boolean,
    default: false,
  },
  scale: {
    type: Number,
    default: 1
  }
});

// hooks定义部分

// 初始化数据
const iframeRef = ref(null);
const useInitData = () => {
  const { proxy } = getCurrentInstance();
  // vuex
  const store = useStore();
  // 数据
  const editData = computed(() => store.state.editData);
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
const useLog = ({ proxy }) => {
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
    openAlmightyConsole,
    useImport
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
      <script src="${base}base/index.js"><\/script>
      <script src="${base}console/${dev ? 'index.js' : 'compile.js'}"><\/script>
    `;
    let jsContent = ''
    let successRunNotify = `
      window.parent.postMessage({
        type: 'successRun'
      })
    `
    let errorRunNotify = `
      window.parent.postMessage({
        type: 'errorRun'
      })
    `
    if (useImport) {
      jsContent = `<script type="module">
        ${openAlmightyConsole ? "eruda.init();" : ""}
        ${jsStr}
        ${successRunNotify}
      <\/script>`
    } else {
      jsContent = `<script>
        ${openAlmightyConsole ? "eruda.init();" : ""}
        try {
          ${jsStr}
          ${successRunNotify}
        } catch (err) {
          console.error('js代码运行出错')
          console.error(err)
          ${errorRunNotify}
        }
      <\/script>`
    }
    let body = `
      ${htmlStr}
      ${_jsResources}
      ${
        openAlmightyConsole
          ? `<script src="${base}eruda/eruda.js"><\/script>`
          : ""
      }
      ${jsContent}
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
  const runStartTime = ref(0);
  const run = async () => {
    try {
      runStartTime.value = Date.now();
      proxy.$eventEmitter.emit("startRun");
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
          // _jsResourcesPlus = getTemplate(vueLanguage.value).code.JS.resources;
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
      let _cssResources = _cssResourcesPlus.concat(cssResources.value
        .map((item) => {
          return {
            ...item,
          };
        }));
      let _jsResources = _jsResourcesPlus.concat(jsResources.value
        .map((item) => {
          return {
            ...item,
          };
        }));
      srcdoc.value = createHtml(
        compiledData.html,
        compiledData.js.js,
        compiledData.css,
        _cssResources,
        _jsResources,
        openAlmightyConsole.value,
        compiledData.js.useImport
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
    runStartTime
  };
};

// 新开窗口预览模式处理
const useNewWindowPreview = ({
  newWindowPreviewData,
  isNewWindowPreview,
  run,
  runStartTime
}) => {
  // 新开窗口预览模式接收预览通知
  window.addEventListener("message", ({ data = {} }) => {
    if (data.type === "preview") {
      newWindowPreviewData.value = data.data;
      isNewWindowPreview.value = true;
      run();
    } else if (data.type === "successRun") {
      proxy.$eventEmitter.emit("successRun", Date.now() - runStartTime.value);
    } else if (data.type === "errorRun") {
      proxy.$eventEmitter.emit("errorRun");
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
const useDynamicRunJs = ({ proxy }) => {
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

// 缩放
const useScale = () => {
  const iframeStyle = computed(() => {
    let style = {
      transform: `scale(${props.scale})`
    }
    if (props.scale !== 1) {
      let multiple = (1 / props.scale) * 100
      style.width = `${multiple}%`
      style.height = `${multiple}%`
    }
    return style
  })

  return {
    iframeStyle
  }
}

// created部分
const {
  proxy,
  store,
  editData,
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
const { log } = useLog({ proxy });
const { createHtml } = useCreateHtml();
const { srcdoc, run, runStartTime } = useRun({
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
useNewWindowPreview({ newWindowPreviewData, isNewWindowPreview, run, runStartTime });
const { disabledEvents } = useDrag({ proxy });
useDynamicRunJs({ proxy });
const { iframeStyle } = useScale();
</script>

<style scoped lang="less">
.previewBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;

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
    transform-origin: 0 0;
  }
}
</style>
