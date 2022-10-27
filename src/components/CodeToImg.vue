<template>
  <div>
    <!-- 生成代码图片配置弹窗 -->
    <el-dialog
      title="生成代码图片"
      :width="500"
      v-model="createCodeImgSettingDialogVisible"
    >
      <div class="settingRow">
        <span class="name">是否显示代码行号</span>
        <div class="control">
          <el-switch v-model="codeImgSetting.lineNumbers" />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">是否显示小圆点</span>
        <div class="control">
          <el-switch v-model="codeImgSetting.showDots" />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">宽度</span>
        <div class="control">
          <el-input-number
            v-model="codeImgSetting.width"
            :min="0"
            :max="5000"
          />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">上边距</span>
        <div class="control">
          <el-input-number v-model="codeImgSetting.top" :min="0" :max="100" />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">下边距</span>
        <div class="control">
          <el-input-number
            v-model="codeImgSetting.bottom"
            :min="0"
            :max="100"
          />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">圆角</span>
        <div class="control">
          <el-input-number
            v-model="codeImgSetting.radius"
            :min="0"
            :max="100"
          />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">等待时间（秒）</span>
        <div class="control">
          <el-input-number v-model="codeImgSetting.delay" :min="3" :max="100" />
          <p class="desc">
            如果生成的图片内代码未高亮完全，可适当延长等待时间。
          </p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelCreateCodeImg">取 消</el-button>
          <el-button
            type="primary"
            @click="confirmCreateCodeImg"
            :loading="creatingCodeImg"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 生成代码图片预览弹窗 -->
    <el-dialog
      custom-class="codeImgPreviewDialog"
      title="图片预览"
      :width="700"
      v-model="codeImgPreviewDialogVisible"
    >
      <div class="codeImgPreviewBox" :style="codeImgPreviewBoxStyle">
        <img :src="codeImgPreviewUrl" ref="codeImgPreviewBoxImg" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDownloadCodeImg">关 闭</el-button>
          <el-button type="primary" @click="confirmDownloadCodeImg"
            >下 载</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, defineExpose, defineProps, nextTick } from 'vue'
import { codeToImg } from '@/utils/codeToImg'
import { ElButton, ElDialog, ElSwitch, ElInputNumber } from 'element-plus'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

const props = defineProps({
  getThemeData: {
    type: Function
  },
  codeTheme: {
    type: String,
    default: ''
  },
  codeFontSize: {
    type: Number,
    default: 16
  }
})

// 代码图片预览下载
const codeImgPreviewBoxImg = ref(null)
const useCodeImgPreview = () => {
  const codeImgPreviewDialogVisible = ref(false)
  const codeImgPreviewUrl = ref('')
  const codeImgPreviewBoxStyle = reactive({
    width: 0,
    height: 0
  })
  let cropper = null

  // 关闭弹窗
  const cancelDownloadCodeImg = () => {
    codeImgPreviewDialogVisible.value = false
    codeImgPreviewUrl.value = ''
  }

  // 下载图片
  const confirmDownloadCodeImg = () => {
    let canvas = cropper.getCroppedCanvas()
    let link = document.createElement('a')
    link.download = 'export.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  // 设置预览url
  const setCodeImgPreviewUrl = url => {
    let image = new Image()
    const defaultWidth = 700
    const defaultHeight = 500
    const defaultRatio = defaultWidth / defaultHeight
    image.onload = () => {
      let imageRatio = image.width / image.height
      let _width = 0
      let _height = 0
      if (imageRatio > defaultRatio) {
        // 宽固定，调整高度
        _width = defaultWidth
        _height = defaultWidth / imageRatio
      } else {
        // 高固定，调整宽度
        _height = defaultHeight
        _width = imageRatio * defaultHeight
      }
      codeImgPreviewBoxStyle.width = _width + 'px'
      codeImgPreviewBoxStyle.height = _height + 'px'
      codeImgPreviewUrl.value = url
      codeImgPreviewDialogVisible.value = true
      nextTick(() => {
        let initCropperData = {
          left: 0,
          top: 0,
          width: _width,
          height: _height
        }
        if (cropper) {
          cropper.destroy()
          cropper = null
        }
        cropper = new Cropper(codeImgPreviewBoxImg.value, {
          viewMode: 1,
          minContainerWidth: 0,
          minContainerHeight: 0,
          ready() {
            cropper.setCropBoxData(initCropperData)
          }
        })
      })
    }
    image.src = url
  }

  return {
    codeImgPreviewDialogVisible,
    codeImgPreviewUrl,
    codeImgPreviewBoxStyle,
    cancelDownloadCodeImg,
    confirmDownloadCodeImg,
    setCodeImgPreviewUrl
  }
}

// 生成代码图片
const useCreateCodeImg = ({ setCodeImgPreviewUrl }) => {
  const createCodeImgSettingDialogVisible = ref(false)
  const codeImgSetting = reactive({
    lineNumbers: false,
    top: 20,
    bottom: 20,
    radius: 5,
    width: 1000,
    showDots: true,
    delay: 3
  })
  const creatingCodeImg = ref(false)
  let editor = null
  let createItem = null

  // 显示设置弹窗
  const showCreateCodeImg = (_editor, item) => {
    createCodeImgSettingDialogVisible.value = true
    editor = _editor
    createItem = item
  }

  // 关闭弹窗
  const cancelCreateCodeImg = () => {
    createCodeImgSettingDialogVisible.value = false
    creatingCodeImg.value = false
    editor = null
    createItem = null
  }

  // 确认生成代码图片
  const confirmCreateCodeImg = async () => {
    creatingCodeImg.value = true
    let img = await codeToImg({
      editor, // 当前编辑器实例
      themeData: props.getThemeData(), // 当前主题数据
      ...codeImgSetting,
      codeTheme: props.codeTheme,
      codeFontSize: props.codeFontSize,
      content: editor.getValue(),
      language: createItem.language
    })
    creatingCodeImg.value = false
    cancelCreateCodeImg()
    setCodeImgPreviewUrl(img)
  }

  return {
    createCodeImgSettingDialogVisible,
    codeImgSetting,
    showCreateCodeImg,
    cancelCreateCodeImg,
    confirmCreateCodeImg,
    creatingCodeImg
  }
}

const {
  codeImgPreviewDialogVisible,
  codeImgPreviewUrl,
  codeImgPreviewBoxStyle,
  cancelDownloadCodeImg,
  confirmDownloadCodeImg,
  setCodeImgPreviewUrl
} = useCodeImgPreview()

const {
  createCodeImgSettingDialogVisible,
  codeImgSetting,
  showCreateCodeImg,
  cancelCreateCodeImg,
  confirmCreateCodeImg,
  creatingCodeImg
} = useCreateCodeImg({
  setCodeImgPreviewUrl
})

defineExpose({
  showCreateCodeImg
})
</script>

<style lang="less" scoped>
.settingRow {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .name {
    width: 120px;
    text-align: right;
    margin-right: 10px;
    flex-shrink: 0;
  }

  .control {
    .desc {
      color: rgba(0, 0, 0, 0.4);
    }
  }
}

/deep/ .codeImgPreviewDialog {
  .el-dialog__body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.codeImgPreviewBox {
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
