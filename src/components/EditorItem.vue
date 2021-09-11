<template>
  <div class="editorItem" ref="editorItem">
    <div class="editorContent">
      <div class="editorContentHeader">
        <div class="title" :class="[{ rotate: noSpace }, dir]">{{ title }}</div>
        <div class="right">
          <!-- 格式化按钮 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="格式化"
            placement="bottom"
            v-if="formatterParserMap[language]"
          >
            <div class="addBtn" @click="codeFormatter">
              <span class="el-icon-s-open"></span>
            </div>
          </el-tooltip>
          <!-- 添加资源按钮 -->
          <template v-if="showAllAddResourcesBtn">
            <el-tooltip
              class="item"
              effect="dark"
              content="添加css资源"
              placement="bottom"
              v-if="showAddBtn"
            >
              <div class="addBtn" @click="addResource('CSS')">
                <span class="el-icon-plus"></span>
              </div>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="添加js资源"
              placement="bottom"
              v-if="showAddBtn"
            >
              <div class="addBtn" @click="addResource('JS')">
                <span class="el-icon-plus"></span>
              </div>
            </el-tooltip>
          </template>
          <template v-else>
            <el-tooltip
              class="item"
              effect="dark"
              content="添加资源"
              placement="bottom"
              v-if="showAddBtn"
            >
              <div class="addBtn" @click="addResource">
                <span class="el-icon-plus"></span>
              </div>
            </el-tooltip>
          </template>
          <!-- 选择语言 -->
          <el-select
            size="mini"
            v-model="preprocessor"
            @change="preprocessorChange"
          >
            <el-option
              v-for="item in preprocessorList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="editorContentBody" ref="editorEl"></div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  useContext,
  onBeforeUnmount,
  onMounted,
  watch,
  nextTick,
} from "vue";
import { ElMessage } from "element-plus";
import ResizeObserver from "resize-observer-polyfill";
import { supportLanguage, formatterParserMap } from "@/config/constants";

// 触发事件
const { emit } = useContext();

// props
const props = defineProps({
  preprocessorList: {
    type: Array,
    default() {
      return [];
    },
  },
  title: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  showAddBtn: {
    type: Boolean,
    default: false,
  },
  codeTheme: {
    type: String,
    default: "",
  },
  dir: {
    type: String,
    default: "",
  },
  showAllAddResourcesBtn: {
    type: Boolean,
    default: false,
  }
});

// 编辑器容器
const editorEl = ref(null);
// 编辑器
let editor = null;
// 预处理器
const preprocessor = ref(props.language);
const noSpace = ref(false);

/**
 * @Author: 王林25
 * @Date: 2021-05-12 19:16:00
 * @Desc: 修改预处理器
 */
const preprocessorChange = (e) => {
  emit("preprocessor-change", e);
};

/**
 * @Author: 王林25
 * @Date: 2021-04-29 20:05:50
 * @Desc: 创建编辑器
 */
const tryMaxCount = 10;
let tryCount = 0;
const createEditor = () => {
  if (!editor) {
    // 有时候monaco对象还不存在，所以递归进行检查
    if (!window.monaco) {
      console.log("Monaco对象不存在，正在重新获取");
      if (tryCount > tryMaxCount) {
        return ElMessage.error("页面加载出错，请刷新重试");
      }
      tryCount++;
      setTimeout(() => {
        createEditor();
      }, 0);
      return;
    }
    // 创建编辑器
    editor = window.monaco.editor.create(editorEl.value, {
      model: null,
      minimap: {
        enabled: false, // 关闭小地图
      },
      wordWrap: "on", // 代码超出换行
      theme: props.codeTheme || "vs-dark", // 主题
      fontSize: 18,
      fontFamily: "MonoLisa, monospace",
    });
    // 设置文档内容
    updateDoc(props.content, props.language);
    // 监听编辑事件
    editor.onDidChangeModelContent((e) => {
      emit("code-change", editor.getValue());
    });
    // 监听失焦事件
    editor.onDidBlurEditorText((e) => {
      emit("blur", editor.getValue());
    });
  }
};

// 监听设置代码主题
watch(
  () => {
    return props.codeTheme;
  },
  () => {
    monaco.editor.setTheme(props.codeTheme);
  }
);

/**
 * @Author: 王林25
 * @Date: 2021-05-13 09:38:24
 * @Desc: 更新编辑器文档模型
 */
const updateDoc = (code, language) => {
  if (!editor) {
    return;
  }
  let oldModel = editor.getModel();
  let newModel = window.monaco.editor.createModel(
    code,
    supportLanguage[language]
  );
  editor.setModel(newModel);
  if (oldModel) {
    oldModel.dispose();
  }
};

/**
 * @Author: 王林25
 * @Date: 2021-04-30 17:19:25
 * @Desc: 获取文档内容
 */
const getValue = () => {
  return editor.getValue();
};

/**
 * @Author: 王林25
 * @Date: 2021-05-13 19:30:08
 * @Desc: 点击添加资源
 */
const addResource = (languageType) => {
  emit("add-resource", languageType);
};

// 更新文档内容
watch(
  () => {
    return props.content;
  },
  () => {
    updateDoc(props.content, props.language);
  }
);

// 更新语言
watch(
  () => {
    return props.language;
  },
  () => {
    preprocessor.value = props.language;
    updateDoc(props.content, props.language);
  }
);

const editorItem = ref(null);

// 更新尺寸
let timer = null;
const resize = () => {
  // 100ms内只执行一次，优化卡顿问题
  if (timer) {
    return;
  }
  timer = setTimeout(() => {
    nextTick(() => {
      let { width, height } = editorItem.value.getBoundingClientRect();
      noSpace.value = (props.dir === "h" ? width : height) <= 100;
      editor && editor.layout();
      timer = null;
    });
  }, 100);
};

/**
 * @Author: 王林25
 * @Date: 2021-05-18 10:16:50
 * @Desc: 监听dom大小变化
 */
const ro = new ResizeObserver((entries, observer) => {
  for (const entry of entries) {
    if (entry.target.classList.contains("editorItem")) {
      resize();
    }
  }
});

/**
 * @Author: 王林25
 * @Date: 2021-05-20 16:06:31
 * @Desc: 代码格式化
 */
const codeFormatter = () => {
  let str = prettier.format(getValue(), {
    parser: formatterParserMap[props.language],
    plugins: prettierPlugins,
  });
  // 设置文档内容
  updateDoc(str, props.language);
  // 监听编辑事件
  editor.onDidChangeModelContent((e) => {
    emit("code-change", editor.getValue());
  });
};

// 挂载完成
onMounted(() => {
  createEditor();
  ro.observe(editorItem.value);
});

// 即将解除挂载
onBeforeUnmount(() => {
  ro.unobserve(editorItem.value);
});
</script>

<style scoped lang="less">
.editorItem {
  width: 100%;
  height: 100%;
  background-color: #1d1e22;
  display: flex;
  // overflow: hidden;

  .editorContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .editorContentHeader {
      width: 100%;
      height: 35px;
      background-color: rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;
      flex-grow: 0;
      flex-shrink: 0;
      padding-right: 20px;

      .title {
        font-weight: bold;
        color: #aaaebc;
        font-size: 18px;
        transition: all 0.2s;

        &.rotate {
          transform: rotate(90deg) translate(-2px, 6px);
          transform-origin: left top;
          font-size: 14px;

          &.v {
            transform: rotate(0deg) translateY(-28px);
          }
        }
      }

      /deep/ .el-input__inner {
        width: 120px;
        background-color: transparent;
        border-color: #606266;
      }

      /deep/ .el-select .el-input .el-select__caret {
        color: #606266;
      }

      .right {
        display: flex;
        align-items: center;

        .addBtn {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          color: #606266;
          font-weight: bold;
          cursor: pointer;
          border-radius: 3px;
          overflow: hidden;
          transition: all 0.3s;

          &:hover {
            background-color: #333642;
          }
        }
      }
    }

    .editorContentBody {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>