<template>
  <div>
    <h2>게시글 작성</h2>
    <hr class="my-4" />
  </div>
  <PostForm
    @submit.prevent="save"
    v-model:title="form.title"
    v-model:content="form.content"
  >
    <template #actions>
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
    </template>
  </PostForm>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createPost } from "@/api/posts";
import dayjs from "dayjs";
import PostForm from "@/components/posts/PostForm.vue";
const router = useRouter();
const form = ref({
  title: null,
  content: null,
});
const save = async () => {
  try {
    await createPost({
      ...form.value,
      createdAt: dayjs().format("YYYY-MM-DD"),
    });
    router.push({ name: "PostList" });
  } catch (error) {
    console.error(error);
  }
};
const goList = () => {
  router.push({
    name: "PostList",
  });
};
</script>

<style scoped></style>
