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
            <span>
              <component :is="getIconComponent(route.meta.icon)" :style="{fontSize: '18px', color: 'green'}"/>
              <!--               <SmileFilled :style="{fontSize: '20px', color: 'green'}"/>-->
              {{ route.meta.title }}
            </span>
          </template>
          <a-menu-item
              v-for="child in route.children"
              :key="`${route.path}/${child.path}`"
          >
            {{ child.meta.title }}
          </a-menu-item>
        </a-sub-menu>

        <!-- 无子路由的菜单项 -->
        <a-menu-item v-else :key="route.path">
          <template #icon>
            <span>
                <component :is="getIconComponent(route.meta.icon)" :style="{fontSize: '18px', color: 'pink'}"/>
              <!--              <SmileFilled/>-->
            </span>
          </template>
          {{ route.meta.title }}
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>


<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import {
  SmileFilled,
  FormOutlined
} from '@ant-design/icons-vue';


const router = useRouter();
const route = useRoute();
const selectedKeys = ref([]); // 当前选中项
const openKeys = ref([]);    // 当前展开的菜单

console.log({ router, route });

// 过滤出需要显示在菜单中的路由
const menuRoutes = router.options.routes.filter(
    (r) => r.meta && r.meta.title
);

console.log({ menuRoutes });

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
const handleClick = (val) => {
  console.log({ val });
  router.push(val.key);
};

// 处理菜单展开/折叠
const handleOpenChange = (keys) => {
  openKeys.value = keys;
};

const getIconComponent = (iconName) => {
  // 根据 iconName 返回对应的图标组件
  const icons = {
    SmileFilled,
    FormOutlined,
    // 可以在这里添加其他图标组件
  };
  return icons[iconName] || null;  // 如果没找到图标，返回 null
};

</script>

<style scoped lang="scss">

</style>