<template>
  <div class="consoleBox">
    <div class="header">
      <div class="left">
        <span class="btn el-icon-delete" @click="clear"></span>
        <span class="errorCount" v-if="errorCount > 0"
          ><span class="icon el-icon-error"></span>{{ errorCount }}</span
        >
      </div>
      <div class="right"></div>
    </div>
    <div class="logBox" ref="logBoxRef">
      <div
        class="logRow"
        v-for="(log, index) in logList"
        :key="index"
        :class="[log.type]"
      >
        <template v-for="(logItem, itemIndex) in log.data" :key="itemIndex">
          <!-- json对象 -->
          <div
            class="logItem json"
            v-if="['object', 'array'].includes(logItem.contentType)"
            v-html="logItem.content"
            @click="jsonClick"
          ></div>
          <!-- 字符串、数字 -->
          <div
            class="logItem message"
            v-else
            :class="[logItem.contentType]"
            v-html="logItem.content"
          ></div>
        </template>
      </div>
    </div>
    <div class="commandBox">
      <span class="icon el-icon-arrow-right"></span>
      <textarea
        class="textarea"
        v-model="jsInput"
        @keydown.enter="implementJs"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onBeforeUnmount,
  getCurrentInstance,
  nextTick,
  computed,
} from "vue";

//  hooks定义部分

// 初始化
const useInit = () => {
  const { proxy } = getCurrentInstance();

  return {
    proxy,
  };
};

// 日志处理
const useLog = ({ proxy }) => {
  const logList = ref([]); // 日志信息列表
  const logBoxRef = ref(null); // 日志容器dom

  // 错误信息数量
  const errorCount = computed(() => {
    return logList.value.filter((item) => {
      return item.type === "error";
    }).length;
  });

  // 清空控制台日志
  const clear = () => {
    logList.value = [];
  };

  proxy.$eventEmitter.on("clear_logs", clear);

  // 接收打印信息
  const onMessage = ({ data = {} }) => {
    if (data.type === "console") {
      if (data.method === "clear") {
        clear();
      } else {
        logList.value.push({
          type: data.method,
          data: data.data,
        });
        nextTick(() => {
          logBoxRef.value.scrollTop = logBoxRef.value.scrollHeight;
        });
      }
    }
  };

  // 监听iframe信息
  window.addEventListener("message", onMessage);

  onBeforeUnmount(() => {
    window.removeEventListener("message", onMessage);
    proxy.$eventEmitter.off("clear_logs", clear);
  });

  return {
    logList,
    logBoxRef,
    errorCount,
    clear,
  };
};

// 动态执行js
const useImplementJs = ({ proxy }) => {
  const jsInput = ref("");

  // 动态执行js
  const implementJs = (e) => {
    if (e.shiftKey) {
      return;
    }
    e.preventDefault();
    if (jsInput.value.trim()) {
      proxy.$eventEmitter.emit("dynamic_js_command", jsInput.value.trim());
      jsInput.value = "";
    }
  };

  return {
    jsInput,
    implementJs,
  };
};

// json数据格式化
const useJSONFormat = () => {
  // 获取指定类名的第一个子节点
  const getChildByClassName = (el, className) => {
    let children = el.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains(className)) {
        return children[i];
      }
    }
    return null;
  };

  // json数据展开收缩
  let expandIndex = 0;
  const jsonClick = (e) => {
    // 点击是展开收缩按钮
    if (e.target && e.target.classList.contains("expandBtn")) {
      let target = e.target;
      let parent = target.parentNode;
      // id，每个展开收缩按钮唯一的标志
      let index = target.getAttribute("data-index");
      if (index === null) {
        index = expandIndex++;
        target.setAttribute("data-index", index);
      }
      // 获取当前状态，0表示收缩、1表示展开
      let status = target.getAttribute("expand-status") || "1";
      // 在子节点里找到wrap元素
      let wrapEl = getChildByClassName(parent, "wrap");
      // 找到下层所有的按钮节点
      let btnEls = wrapEl.querySelectorAll(".expandBtn");
      // 收缩状态 -> 展开状态
      if (status === "0") {
        // 设置状态为展开
        target.setAttribute("expand-status", "1");
        // 展开
        wrapEl.style.height = "auto";
        // 按钮箭头旋转
        target.classList.remove("shrink");
        // 移除省略号元素
        let ellipsisEl = getChildByClassName(parent, "ellipsis");
        parent.removeChild(ellipsisEl);
        // 显示下级展开收缩按钮
        for (let i = 0; i < btnEls.length; i++) {
          let _index = btnEls[i].getAttribute("data-for-index");
          // 只有被当前按钮收缩的按钮才显示
          if (_index === index) {
            btnEls[i].removeAttribute("data-for-index");
            btnEls[i].style.display = "inline-block";
          }
        }
      } else if (status === "1") {
        // 展开状态 -> 收缩状态
        target.setAttribute("expand-status", "0");
        wrapEl.style.height = 0;
        target.classList.add("shrink");
        let ellipsisEl = document.createElement("div");
        ellipsisEl.textContent = "...";
        ellipsisEl.className = "ellipsis";
        parent.insertBefore(ellipsisEl, wrapEl);
        for (let i = 0; i < btnEls.length; i++) {
          let _index = btnEls[i].getAttribute("data-for-index");
          // 只隐藏当前可以被隐藏的按钮
          if (_index === null) {
            btnEls[i].setAttribute("data-for-index", index);
            btnEls[i].style.display = "none";
          }
        }
      }
    }
  };

  return {
    jsonClick,
  };
};

// created部分
const { proxy } = useInit();
const { logList, logBoxRef, errorCount, clear } = useLog({ proxy });
const { jsInput, implementJs } = useImplementJs({ proxy });
const { jsonClick } = useJSONFormat();
</script>

<style scoped lang="less">
.consoleBox {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #131417;
  overflow: hidden;

  .header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: #333642;
    color: #aaaebc;
    font-size: 12px;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;

    .left {
      display: flex;
      align-items: center;
    }

    .btn {
      border: 3px solid transparent;
      color: white;
      cursor: pointer;
      font-size: 12px;
      padding: 0 5px;

      &:active {
        transform: translateY(1px);
      }

      &:hover {
        background: #444857;
      }
    }

    .errorCount {
      margin-left: 5px;
      color: #f56c6c;
      .icon {
        color: #f56c6c;
        margin-right: 3px;
      }
    }
  }

  .logBox {
    position: absolute;
    left: 0;
    top: 30px;
    bottom: 30px;
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
      background: #202123;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      border: 1px solid rgba(255, 255, 255, 0.16);
      background-color: rgba(0, 0, 0, 0.64);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
    }

    &::-webkit-scrollbar-corner {
    }

    .logRow {
      border-bottom: 1px solid #5a5f73;
      padding: 10px 10px 5px;
      margin-bottom: 0;
      display: flex;

      &.error {
        background: rgba(255, 0, 0, 0.2);
      }

      &.warn {
        background: rgba(235, 255, 0, 0.15);
      }

      .logItem {
        display: inline-block;
        margin-right: 10px;

        &.message {
          color: #fff;
          white-space: pre-wrap;

          &.string {
            color: #ce9178;
          }

          &.number {
            color: #b5cea8;
          }

          &.boolean,
          &.null,
          &.undefined {
            color: #569cd6;
          }

          &.symbol {
            color: #3dc9b0;
          }
        }

        &.json {
          line-height: 22px;
          color: #999999;
          padding-left: 20px;
          position: relative;

          /deep/ .expandBtn {
            position: absolute;
            left: 0;
            cursor: pointer;
            transform: rotateZ(90deg);
            transition: all 0.3s;
            line-height: 22px;

            &.shrink {
              transform: rotateZ(0deg);
            }
          }
          /deep/ .wrap {
            overflow: hidden;
          }
          /deep/ .object,
          /deep/ .array {
            margin-left: 20px;
          }
          /deep/ .bracket {
            color: #999999;
          }
          /deep/ .key {
            color: #e06c75;
          }
          /deep/ .colon {
            color: #999999;
            margin: 0 5px;
          }
          /deep/ .string,
          /deep/ .symbol {
            color: #98c379;
          }
          /deep/ .number {
            color: #d19a66;
          }
          /deep/ .boolean,
          /deep/ .null,
          /deep/ .undefined {
            color: #56b6c2;
          }
        }
      }
    }
  }

  .commandBox {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    background: rgba(255, 255, 255, 0.1);
    padding: 0 8px 0 0;
    display: flex;

    .icon {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      flex-grow: 0;
      flex-shrink: 0;
    }

    .textarea {
      width: 100%;
      height: 100%;
      border: none;
      background-color: transparent;
      outline: none;
      color: #fff;
      padding: 7px 0 7px 7px;
      resize: none;
    }
  }
}
</style>
