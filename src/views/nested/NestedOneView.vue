<template>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <RouterLink
        class="nav-link"
        active-class="active"
        :to="{ name: 'NestedOneAndOne', replace: true }"
        >2중첩 1장</RouterLink
      >
      <!-- replace는 히스토리를 남기지않고 덮어씌운다, 중첩된 라우트에서 여러 중첩탭을 이동하다가 중첩라우트 이전탭으로 바로 가고싶으면 유용할수있다 -->
    </li>
    <li class="nav-item">
      <RouterLink
        class="nav-link"
        active-class="active"
        :to="{ name: 'NestedOneAndTwo', replace: true }"
        >2중첩 2장</RouterLink
      >
    </li>
  </ul>
  <RouterView> </RouterView>
</template>

<script setup></script>

<style scoped></style>
