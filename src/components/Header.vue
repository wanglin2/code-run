<template>
  <div class="header">
    <div class="left">
      <h1>CodeRun</h1>
    </div>
    <div class="right">
      <div class="btn" @click="openSetting">
        <span class="icon el-icon-s-tools"></span> 设置
      </div>
      <div class="btn" @click="openTemplate">
        <span class="icon el-icon-s-opportunity"></span> 模板
      </div>
      <div class="btn" @click="run">
        <span class="icon el-icon-s-promotion"></span> 运行
      </div>
    </div>
    <el-dialog title="常用模板" :width="1000" v-model="templateDialogVisible">
      <div class="templateList">
        <div
          class="templateItem"
          v-for="item in templateData"
          :key="item.name"
          @click="selectTemplate(item)"
        >
          <div
            class="icon"
            :style="{ backgroundImage: `url(${item.icon})` }"
          ></div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      custom-class="settingDialog"
      title="设置"
      :width="600"
      v-model="settingDialogVisible"
    >
      <div class="settingBox">
        <el-tabs tab-position="left" v-model="settingType">
          <el-tab-pane label="主题设置" name="theme"></el-tab-pane>
          <el-tab-pane label="布局设置" name="layout"></el-tab-pane>
          <el-tab-pane label="其他设置" name="setting"></el-tab-pane>
        </el-tabs>
        <div class="settingContent">
          <component :is="componentsMap[settingType]"></component>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, computed } from "vue";
import templateList from "@/utils/templates";
import { useStore } from "vuex";
import Setting from "./Setting.vue";
import SettingLayout from "./SettingLayout.vue";
import SettingTheme from "./SettingTheme.vue";

const { proxy } = getCurrentInstance();

// vuex
const store = useStore();
const layout = computed(() => {
  return store.state.editData.config.layout
})

/**
 * @Author: 王林25
 * @Date: 2021-05-14 10:33:04
 * @Desc: 运行
 */
const run = () => {
  proxy.$eventEmitter.emit("run");
  if (layout.value === 'newWindowPreview') {
    proxy.$eventEmitter.emit('preview_window_run')
  }
};

// ------------- 模板选择功能 ---------------------

const templateDialogVisible = ref(false);
const templateData = ref(templateList);

/**
 * @Author: 王林25
 * @Date: 2021-05-14 10:42:51
 * @Desc: 打开选择模板弹窗
 */
const openTemplate = () => {
  templateDialogVisible.value = true;
};

/**
 * @Author: 王林25
 * @Date: 2021-05-14 11:22:32
 * @Desc: 选择某个模板
 */
const selectTemplate = (data) => {
  store.commit("setCode", JSON.parse(JSON.stringify(data.code)));
  proxy.$eventEmitter.emit("reset_code");
  templateDialogVisible.value = false;
};

// ------------- 设置功能 ---------------------

const settingDialogVisible = ref(false);
const settingType = ref("theme");
const componentsMap = ref({
  theme: SettingTheme,
  layout: SettingLayout,
  setting: Setting,
});

/**
 * @Author: 王林
 * @Date: 2021-05-15 07:28:49
 * @Desc: 打开设置弹窗
 */
const openSetting = () => {
  settingDialogVisible.value = true;
};
</script>

<style scoped lang="less">
.header {
  background: #1e1f26;
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 20px;

  .left {
    h1 {
      color: #fff;
    }
  }

  .right {
    display: flex;

    .btn {
      background: none;
      border: 3px solid #444857;
      color: #fff;
      min-width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px 16px;
      margin: 0 10px 0 0;
      position: relative;
      border-radius: 4px;
      text-overflow: ellipsis;
      text-decoration: none !important;
      font-weight: 400 !important;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: #5a5f73;
        border-color: #5a5f73;
      }

      &:active {
        transform: translateY(1px);
      }

      .icon {
        margin-right: 5px;
      }
    }
  }
}

.templateList {
  width: 100%;
  height: 400px;
  overflow: auto;

  .templateItem {
    width: 230px;
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(36 36 36);
    float: left;
    margin-right: 10px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(36, 36, 36, 0.1);
    }

    .icon {
      width: 60px;
      height: 60px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin-left: 10px;
    }

    .name {
      font-weight: bold;
      margin-left: 20px;
      font-size: 18px;
    }
  }
}

/deep/ .settingDialog {
  .el-dialog__body {
    padding: 0px;
  }

  .settingBox {
    display: flex;

    .el-tabs {
      flex-grow: 0;
      flex-shrink: 0;
    }

    .settingContent {
      width: 100%;
      height: 300px;
      overflow: auto;
      padding: 10px;
    }
  }
}
</style>
