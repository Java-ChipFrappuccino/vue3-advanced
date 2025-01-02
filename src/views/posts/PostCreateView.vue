<template>
  <div>
    <h2>게시글 작성</h2>
    <hr class="my-4" />
  </div>
  <form @submit.prevent>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input type="email" class="form-control" id="title" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea class="form-control" id="content" rows="3"></textarea>
    </div>
    <div class="pt-4">
      <button
        type="button"
        class="btn btn-outline-secondary me-2"
        @click="goList"
      >
        목록
      </button>
      <button class="btn btn-outline-success">저장</button>
    </div>
  </form>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goList = () => {
  router.push({
    name: "PostList",
  });
};
</script>

<style scoped></style>
