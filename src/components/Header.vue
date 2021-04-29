<template>
  <div class="header">
    <div class="left">
      <h1>CodeRun</h1>
    </div>
    <div class="right">
      <el-button class="icon" icon="el-icon-refresh-right" size="medium">运行</el-button>
    </div>
  </div>
</template>

<script setup>
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
    .icon {
      font-weight: bold !important;
    }
  }
}
</style>
