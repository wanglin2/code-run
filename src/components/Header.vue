<template>
  <div class="header">
    <div class="left">
      <h1>CodeRun</h1>
    </div>
    <div class="right">
      <div class="btn" @click="openTemplate">
        <span class="icon el-icon-s-opportunity"></span> 模板
      </div>
      <div class="btn" @click="run">
        <span class="icon el-icon-s-promotion"></span> 运行
      </div>
    </div>
    <el-dialog title="常用模板" :width="1000" v-model="templateDialogVisible">
      <div class="templateList">
        <div class="templateItem" v-for="item in templateData" :key="item.name" @click="selectTemplate(item)">
          <div
            class="icon"
            :style="{ backgroundImage: `url(${item.icon})` }"
          ></div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import templateList from '@/utils/templates'
import { useStore } from 'vuex'

const app = getCurrentInstance()

// vuex
const store = useStore()

/**
 * @Author: 王林25
 * @Date: 2021-05-14 10:33:04
 * @Desc: 运行
 */
const run = () => {
  app.ctx.$eventEmitter.emit('run')
}

// ------------- 模板选择功能 ---------------------

const templateDialogVisible = ref(false)
const templateData = ref(templateList)

/**
 * @Author: 王林25
 * @Date: 2021-05-14 10:42:51
 * @Desc: 打开选择模板弹窗
 */
const openTemplate = () => {
  templateDialogVisible.value = true
}

/** 
 * @Author: 王林25 
 * @Date: 2021-05-14 11:22:32 
 * @Desc: 选择某个模板 
 */
const selectTemplate = (data) =>{
  store.commit('setCode', JSON.parse(JSON.stringify(data.code)))
  app.ctx.$eventEmitter.emit('reset_code')
  templateDialogVisible.value = false
}

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
      background-color:  rgba(36, 36, 36, 0.1);
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
</style>
