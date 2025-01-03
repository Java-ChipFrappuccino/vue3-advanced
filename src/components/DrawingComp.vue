<template>
  <div class="container py-3">
    <canvas
      ref="drawingCanvas"
      width="400"
      height="400"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      style="border: 1px solid black"
    ></canvas>
  </div>
</template>

<script setup>
import { ref } from "vue";

const drawingCanvas = ref(null);
let isDrawing = false;

const startDrawing = (event) => {
  isDrawing = true;
  draw(event); // 클릭된 좌표에 즉시 색칠
};

const stopDrawing = () => {
  isDrawing = false;
};

const draw = (event) => {
  if (!isDrawing) return;

  const canvas = drawingCanvas.value;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect(); // 캔버스 위치 보정
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2); // 반지름 5인 원
  ctx.fillStyle = "gray"; // 색깔 설정
  ctx.fill(); // 색 채우기
};
</script>

<style scoped>
canvas {
  display: block;
  margin: 0 auto;
}
</style>
