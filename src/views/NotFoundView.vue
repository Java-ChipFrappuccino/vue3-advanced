<template>
  <div class="text-center py-5">
    <h1>Oops!</h1>
    <h2>404 Not Found</h2>
    <div>요청한 페이지를 찾을 수 없습니다!</div>
    <div class="mt-4">
      <p>{{ $route.params }}</p>
      <RouterLink to="/">
        <button class="btn btn-success">Home</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
