<template>
  <div>
    <div class="settingRow">
      <div class="content">
        <span class="name">自动运行</span>
        <div class="control">
          <el-switch v-model="autoRun" @change="autoRunChange"></el-switch>
        </div>
      </div>
      <div class="desc">停止输入后1秒自动运行</div>
    </div>
    <div class="settingRow">
      <div class="content">
        <span class="name">开启全能调试</span>
        <div class="control">
          <el-switch v-model="openAlmightyConsole" @change="openAlmightyConsoleChange"></el-switch>
        </div>
      </div>
      <div class="desc">
        预览页面右下角会出现一个按钮，点击即可打开全能调试控制台
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

// vuex
const store = useStore();

// 自动运行
const autoRun = computed(() => {
  return store.state.editData.config.autoRun;
});

/**
 * @Author: 王林
 * @Date: 2021-05-15 08:07:04
 * @Desc: 切换自动运行
 */
const autoRunChange = (e) => {
  store.commit("setAutoRun", e);
};

// 开启全能调试
const openAlmightyConsole = computed(() => {
  return store.state.editData.config.openAlmightyConsole;
});

/** 
 * @Author: 王林 
 * @Date: 2021-05-15 08:22:37 
 * @Desc:  切换全能调试
 */
const openAlmightyConsoleChange = (e) => {
  store.commit("setOpenAlmightyConsole", e);
};
</script>

<style scoped lang="less">
.settingRow {
  margin-bottom: 20px;

  .content {
    display: flex;
    align-items: center;

    .name {
      margin-right: 10px;
    }
  }

  .desc {
    font-size: 12px;
    color: #999;
  }
}
</style>
