<template>
  <a-layout-sider width="200">
    <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }"
        @click="handleClick"
        @openChange="handleOpenChange"
    >
      <template v-for="route in menuRoutes" :key="route.path">
        <!-- 有子路由的菜单项 -->
        <a-sub-menu v-if="route.children && route.children.length" :key="route.path">
          <template #title>
            <span>{{ route.meta.title }}</span>
          </template>
          <a-menu-item
              v-for="child in route.children"
              :key="child.path"
          >
            {{ child.meta.title }}
          </a-menu-item>
        </a-sub-menu>
        <!-- 无子路由的菜单项 -->
        <a-menu-item v-else :key="route.path">
          {{ route.meta.title }}
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>


<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const router = useRouter();
const route = useRoute();
const selectedKeys = ref([]); // 当前选中项
const openKeys = ref([]);    // 当前展开的菜单

console.log({router, route});

// 过滤出需要显示在菜单中的路由
const menuRoutes = router.options.routes.filter(
    (r) => r.meta && r.meta.title
);

console.log({menuRoutes});

// 更新菜单状态
const updateMenuState = () => {
  selectedKeys.value = [route.path];
  openKeys.value = route.matched
      .map((m) => m.path)
      .filter((path) => path && path !== route.path);
};

// 初始化和监听路由变化
updateMenuState();
watch(route, updateMenuState);

// 点击菜单项跳转路由
const handleClick = ({ key }) => {

  console.log({key});
  router.push(key);
};

// 处理菜单展开/折叠
const handleOpenChange = (keys) => {
  openKeys.value = keys;
};
</script>

<style scoped lang="scss">

</style>