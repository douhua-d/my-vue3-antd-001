<template>
  我是 首页
  <!--  <img src="@/assets/cat.svg" alt=""/>-->
  <div>
    <!--    <input type="color"/>-->
    <!--    <CanvasCircle/>-->

    <!--    <sp-color-area-->
    <!--        style="-->
    <!--        width: 72px;-->
    <!--        height: 72px"-->
    <!--    ></sp-color-area>-->
  </div>
</template>


<script setup>
import { ref } from 'vue';
import CanvasCircle from "@/Test/CanvasCircle.vue";
import '@spectrum-web-components/color-area/sp-color-area.js';

import { get, post } from '@/utils/request';

const fetchData = async () => {
  // 响应拦截器里已经统一拦截抛错了，所以这里不需要再抛错了
  const response = await get('/users', { page: 1, limit: 10 });
  console.log({ response });

  // try {
  //   const response = await post('/api/login', { username: 'admin', password: '123456' });
  //   console.log('Login response:', response);
  // } catch (error) {
  //   console.error('Error logging in:', error);
  // }
};

fetchData();

</script>

<style scoped lang="scss">

</style>