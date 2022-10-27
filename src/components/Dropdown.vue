<template>
  <div class="dropdownContainer" ref="dropdownContainer">
    <div class="dropdownHeader" @click="toggleDropdownList()">
      <span
        class="icon iconfont icon-jiantouxia"
        :class="{ show: showDropdownList }"
      ></span>
    </div>
    <div class="dropdownList" :class="{ show: showDropdownList }">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="dropdownItem"
        @click="onDropdownItemClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, defineProps, defineEmits } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
  }
})

const emit = defineEmits(['click'])

// 下拉菜单
const dropdownContainer = ref(null)
const useDropdown = () => {
  const showDropdownList = ref(false)
  const toggleDropdownList = value => {
    showDropdownList.value =
      value !== undefined ? value : !showDropdownList.value
  }
  const onBodyClick = e => {
    let tar = e.target
    while (tar && tar !== document.body) {
      if (tar === dropdownContainer.value) {
        return
      }
      tar = tar.parentNode
    }
    showDropdownList.value = false
  }
  document.body.addEventListener('click', onBodyClick)
  onBeforeUnmount(() => {
    document.body.removeEventListener('click', onBodyClick)
  })

  return {
    showDropdownList,
    toggleDropdownList
  }
}

// 菜单点击
const useClick = ({ emit, showDropdownList }) => {
  const onDropdownItemClick = item => {
    emit('click', item)
    showDropdownList.value = false
  }

  return {
    onDropdownItemClick
  }
}

const { showDropdownList, toggleDropdownList } = useDropdown()
const { onDropdownItemClick } = useClick({ emit, showDropdownList })
</script>

<style lang="less" scoped>
.dropdownContainer {
  position: relative;
  color: var(--editor-header-color);
  height: 30px;

  &:hover {
    .dropdownHeader {
      opacity: 1;
    }
  }

  .dropdownHeader {
    height: 100%;
    opacity: 0.7;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      font-weight: bold;
      transition: all 0.2s ease-in-out;
      transform: rotate(0);

      &.show {
        transform: rotate(180deg);
      }
    }
  }

  .dropdownList {
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 1;
    width: 150px;
    background: var(--el-color-white);
    border: 1px solid var(--el-border-color-light);
    box-shadow: var(--el-box-shadow-light);
    border-radius: var(--el-border-radius-base);
    padding: 6px 0;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.5);
    transform-origin: top right;
    transition: all 0.2s ease-in-out;

    &.show {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    .dropdownItem {
      font-size: var(--el-font-size-base);
      padding: 0 32px 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--el-text-color-regular);
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: var(--el-background-color-base);
      }
    }
  }
}
</style>
