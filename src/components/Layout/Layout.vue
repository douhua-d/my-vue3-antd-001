<template>
  <a-layout class="layout-wrapper">
    <a-layout-header class="header">
      <div class="logo"/>
      <div>设置</div>
    </a-layout-header>

    <a-layout>
      <Sider/>

      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>

        <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <RouterView/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref } from 'vue';
import Sider from "@components/Layout/Sider.vue";
</script>

<style scoped lang="scss">
.layout-wrapper {
}

.header {
  background-color: white;
  border: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.ant-layout-sider) {
  height: calc(100vh - 65px);
}
</style>