<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.content }}</p>
    <p class="text-muted">{{ form.createdAt }}</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-secondary">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-secondary">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>

      <div class="col-auto">
        <button class="btn btn-outline-secondary" @click="goList">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-success" @click="goEdit">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getPostById } from "@/api/posts";
import { ref } from "vue";
const router = useRouter();
const form = ref({});

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const fetchPost = () => {
  const data = getPostById(props.id);
  form.value = { ...data };
};
fetchPost();

const goList = () => {
  router.push({
    name: "PostList",
  });
};

const goEdit = () => {
  router.push({
    name: "PostEdit",
    params: { id: props.id },
  });
};
</script>

<style scoped></style>
