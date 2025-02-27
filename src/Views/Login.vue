<template>
  <div class="login-container">
    <a-form @finish="handleLogin" :model="formState" :rules="rules">
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { message } from 'ant-design-vue';

const router = useRouter();
const userStore = useUserStore();

const formState = ref({
  username: '',
  password: '',
});

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
};

const handleLogin = async (values) => {
  try {
    // 模拟 API 调用
    if (values.username === 'admin' && values.password === '123') {
      userStore.login('mock-token', ['admin'], { name: 'Admin User' });
      message.success('登录成功');
      const redirect = router.currentRoute.value.query.redirect || '/';
      router.push(redirect);
    } else {
      message.error('用户名或密码错误');
    }
  } catch (error) {
    message.error('登录失败');
    console.error(error);
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>