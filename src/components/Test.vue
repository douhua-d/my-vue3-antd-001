<script setup>
import { message } from 'ant-design-vue';
import { ref } from "vue";

const showMessage = () => {
  message.success('你点击了按钮！');
};

const value = ref('horizontal');
const baseStyle = {
  width: '25%',
  height: '54px',
};
</script>

<template>
  <a-button type="primary" @click="showMessage">点击我</a-button>
  <a-flex gap="middle" vertical>
    <a-radio-group v-model:value="value">
      <a-radio value="horizontal">horizontal</a-radio>
      <a-radio value="vertical">vertical</a-radio>
    </a-radio-group>
    <a-flex :vertical="value === 'vertical'">
      <div
          v-for="(item, index) in new Array(4)"
          :key="item"
          :style="{ ...baseStyle, background: `${index % 2 ? '#1677ff' : '#1677ffbf'}` }"
      />
    </a-flex>
  </a-flex>
</template>

<style scoped>

</style>