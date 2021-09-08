<template>
  <div>
    <div class="settingRow">
      <span class="name">代码主题</span>
      <div class="control">
        <el-select v-model="codeTheme" size="small" @change="codeThemeChange">
          <el-option
            v-for="item in codeThemeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { codeThemeList } from "@/config/constants";

// vuex
const store = useStore();

const codeTheme = computed(() => {
  return store.state.editData.config.codeTheme;
});

/**
 * @Author: 王林
 * @Date: 2021-05-15 08:07:04
 * @Desc: 切换代码主题
 */
const codeThemeChange = (e) => {
  store.commit("setCodeTheme", e);
};
</script>

<style scoped lang="less">
.settingRow {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .name {
    margin-right: 10px;
  }
}
</style>
