<template>
  <div class="switchBtnContainer" :class="[size]">
    <div
      class="btn"
      v-for="item in list"
      :key="item.value"
      :class="{ active: modelValue.includes(item.value) }"
      @click="toggleActive(item.value)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
  },
  modelValue: {
    type: Array,
    default() {
      return []
    }
  },
  single: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'large' // small
  }
})

const emits = defineEmits(['update:modelValue'])

const toggleActive = value => {
  let newValue
  if (props.modelValue.includes(value)) {
    newValue = props.modelValue.filter(item => {
      return item !== value
    })
  } else {
    if (props.single) {
      newValue = [value]
    } else {
      newValue = [...props.modelValue, value]
    }
  }
  emits('update:modelValue', newValue)
  emits('change', newValue)
}
</script>

<style scoped lang="less">
.switchBtnContainer {
  height: 100%;
  display: flex;

  &.small {
    .btn {
      font-size: 12px;
    }
  }

  .btn {
    border-top: 3px solid transparent;
    color: var(--header-btn-color);
    padding: 0 15px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
    background: var(--header-btn-background);
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    overflow: hidden;

    &.active {
      border-top-color: var(--header-btn-color);
    }

    &:active {
      transform: translateY(1px);
    }
  }
}
</style>
