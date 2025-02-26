<template>
  <div>
    <canvas ref="canvasRef" width="200" height="200" style="border: 1px solid black;"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'CanvasCircle',
  setup() {
    const canvasRef = ref(null);

    onMounted(() => {
      const canvas = canvasRef.value;
      const ctx = canvas.getContext('2d');

      // 设置圆形的属性
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 50;

      // 清除画布并绘制圆形
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'blue'; // 设置圆形颜色
      ctx.fill();
    });

    return {
      canvasRef,
    };
  },
};
</script>

<style scoped>
/* 可添加样式 */
</style>
