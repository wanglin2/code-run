<template>
  <el-dialog
    :title="`添加${addResourceType}资源`"
    :width="1000"
    v-model="addResourceDialogVisible"
  >
    <div class="btnGroup">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="addOneResource"
        >添加资源</el-button
      >
      <!-- 常用CDN服务 -->
      <el-dropdown style="margin-left: 15px" @command="handleCdnCommand">
        <span class="el-dropdown-link">
          常用CDN服务<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, index) in cdnSiteList"
              :key="index"
              :command="item.url"
              >{{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-table :data="resourceData" empty-text="暂无数据" :height="300">
      <el-table-column label="名称" width="200">
        <template #default="scope">
          <el-input
            v-model="resourceData[scope.$index].name"
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template #default="scope">
          <el-input
            v-model="resourceData[scope.$index].url"
            size="small"
            @change="resourceInputChange(scope.$index)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button
            @click="deleteResource(scope)"
            type="text"
            icon="el-icon-delete"
          ></el-button>
          <el-button
            @click="upResource(scope)"
            type="text"
            icon="el-icon-top"
            :disabled="scope.$index <= 0"
          >
          </el-button>
          <el-button
            @click="downResource(scope)"
            type="text"
            icon="el-icon-bottom"
            :disabled="scope.$index >= resourceData.length - 1"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelAddResource">取 消</el-button>
        <el-button type="primary" @click="confirmAddResource">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, getCurrentInstance, computed, defineExpose } from 'vue'
import {
  ElButton,
  ElDialog,
  ElTable,
  ElDropdownMenu,
  ElDropdownItem,
  ElDropdown,
  ElInput,
  ElTableColumn
} from 'element-plus'
import { cdnSiteList } from '@/config/constants'
import { useStore } from 'vuex'

const proxy = getCurrentInstance().proxy
const store = useStore()
const editData = computed(() => store.state.editData)

// 静态资源管理
const useHandleAssets = () => {
  const addResourceDialogVisible = ref(false)
  const resourceData = ref([])
  const addResourceType = ref('')

  // 跳转到cdn服务
  const handleCdnCommand = url => {
    let a = document.createElement('a')
    a.target = '_blank'
    a.href = url
    a.click()
    a = null
  }

  // 添加资源
  const addResource = item => {
    addResourceType.value = item
    resourceData.value = (editData.value.code[item].resources || []).map(r => {
      return {
        ...r
      }
    })
    addResourceDialogVisible.value = true
  }

  // 删除一个资源
  const deleteResource = e => {
    resourceData.value.splice(e.$index, 1)
  }

  // 添加一个资源
  const addOneResource = () => {
    resourceData.value.push({
      url: '',
      name: ''
    })
  }

  // 上移
  const upResource = e => {
    let index = e.$index
    if (index <= 0) {
      return
    }
    let tmp = resourceData.value[index]
    resourceData.value[index] = resourceData.value[index - 1]
    resourceData.value[index - 1] = tmp
  }

  // 下移
  const downResource = e => {
    let index = e.$index
    if (index >= resourceData.value.length - 1) {
      return
    }
    let tmp = resourceData.value[index]
    resourceData.value[index] = resourceData.value[index + 1]
    resourceData.value[index + 1] = tmp
  }

  // 自动填充名称
  const resourceInputChange = index => {
    if (resourceData.value[index].url) {
      let arr = resourceData.value[index].url.split('/')
      resourceData.value[index].name = arr[arr.length - 1] || ''
    }
  }

  // 取消添加资源
  const cancelAddResource = () => {
    addResourceDialogVisible.value = false
    addResourceType.value = ''
    resourceData.value = []
  }

  // 确认添加资源
  const confirmAddResource = () => {
    let resources = resourceData.value.map(item => {
      return {
        ...item
      }
    })
    store.commit('setCodeResource', {
      type: addResourceType.value,
      resources
    })
    cancelAddResource()
    proxy.$eventEmitter.emit('run-code')
  }

  /**
   * @Author: 王林25
   * @Date: 2022-08-25 18:52:56
   * @Desc: 编辑import map
   */
  const addImportmap = item => {
    proxy.$eventEmitter.emit('show_edit_importmap_dialog', item)
  }

  return {
    resourceData,
    addResourceType,
    addResourceDialogVisible,
    handleCdnCommand,
    addResource,
    addImportmap,
    deleteResource,
    addOneResource,
    cancelAddResource,
    confirmAddResource,
    upResource,
    downResource,
    resourceInputChange
  }
}

const {
  resourceData,
  addResourceType,
  addResourceDialogVisible,
  handleCdnCommand,
  addResource,
  addImportmap,
  deleteResource,
  addOneResource,
  cancelAddResource,
  confirmAddResource,
  upResource,
  downResource,
  resourceInputChange
} = useHandleAssets()

defineExpose({
  addResource,
  addImportmap
})
</script>

<style lang="less"></style>
