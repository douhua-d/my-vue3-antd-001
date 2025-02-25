<template>
  <a-layout class="layout-wrapper">
    <a-layout-header class="header">
      <div class="logo"/>
      <div>设置</div>
    </a-layout-header>

    <a-layout>
      <a-layout-sider width="200">
        <a-menu
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            mode="inline"
            :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined/>
                subnav 1
              </span>
            </template>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <laptop-outlined/>
                资源管理
              </span>
            </template>
            <a-menu-item key="5">图片管理</a-menu-item>
            <a-menu-item key="6">视频管理</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #title>
              <span>
                <notification-outlined/>
                subnav 3
              </span>
            </template>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>

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

const selectedKeys2 = ref(['1']);
const openKeys = ref(['sub1']);
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