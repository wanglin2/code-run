<template>
  <div>
    <div class="settingRow">
      <div class="content">
        <span class="name">布局</span>
        <div class="control">
          <el-radio-group v-model="layout" size="small" @change="layoutChange">
            <el-radio-button label="default">上下</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

// vuex
const store = useStore();

// 布局
const layout = computed(() => {
  return store.state.editData.config.layout;
});

/**
 * @Author: 王林
 * @Date: 2021-05-15 08:07:04
 * @Desc: 切换布局
 */
const layoutChange = (e) => {
  store.commit("setLayout", e);
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
