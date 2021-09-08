<template>
  <div class="editContainer">
    <Header></Header>
    <div class="content">
      <component :is="activeLayout" :key="layout"></component>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import { computed, watch, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { layoutMap } from "@/config/constants";

const { proxy } = getCurrentInstance();

// vuex
const store = useStore();
const editData = computed(() => store.state.editData);

// 布局
const layout = computed(() => {
  return editData.value.config.layout;
});

/**
 * @Author: 王林25
 * @Date: 2021-05-19 16:14:08
 * @Desc: 布局处理
 */
let previewWindow = null;
const layoutHandle = () => {
  // 新窗口预览模式
  if (layout.value === "newWindowPreview") {
    if (!previewWindow) {
      previewWindow = window.open("/preview/");
      previewWindow.onload = () => {
        previewWindowRun();
      };
    }
  } else {
    if (previewWindow) {
      previewWindow.close();
      previewWindow = null;
    }
  }
};

/**
 * @Author: 王林25
 * @Date: 2021-05-19 16:31:54
 * @Desc: 通知预览窗口进行刷新
 */
const previewWindowRun = () => {
  previewWindow &&
    previewWindow.postMessage({
      type: "preview",
      data: {
        config: {
          openAlmightyConsole: editData.value.config.openAlmightyConsole,
        },
        code: {
          HTML: {
            language: editData.value.code.HTML.language,
            content: editData.value.code.HTML.content,
          },
          CSS: {
            language: editData.value.code.CSS.language,
            content: editData.value.code.CSS.content,
            resources: editData.value.code.CSS.resources.map((item) => {
              return {
                ...item,
              };
            }),
          },
          JS: {
            language: editData.value.code.JS.language,
            content: editData.value.code.JS.content,
            resources: editData.value.code.JS.resources.map((item) => {
              return {
                ...item,
              };
            }),
          },
        },
      },
    });
};

proxy.$eventEmitter.on("preview_window_run", previewWindowRun);

layoutHandle();

watch(
  () => {
    return layout.value;
  },
  () => {
    layoutHandle();
  }
);

const activeLayout = computed(() => {
  return layoutMap[layout.value];
});
</script>

<style scoped lang="less">
.editContainer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
