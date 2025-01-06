<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 작성</h2>
    <hr class="my-4" />
  </div>
  <PostForm
    v-if="visibleForm"
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
  <AppAlert :items="alerts"></AppAlert>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { createPost } from "@/api/posts";
import AppAlert from "@/components/app/AppAlert.vue";
import useAlert from "@/composables/alert";
import PostForm from "@/components/posts/PostForm.vue";

const router = useRouter();
const dayjs = inject("dayjs");
const visibleForm = ref(true);
const form = ref({
  title: null,
  content: null,
});
const { vAlert, vSuccess, alerts } = useAlert();
const save = async () => {
  try {
    await createPost({
      ...form.value,
      createdAt: dayjs().format("YYYY-MM-DD"),
    });
    vSuccess("작성완료!");
    // router.push({ name: "PostList" });
  } catch (error) {
    console.error(error);
    vAlert(error);
  }
};
const goList = () => {
  router.push({
    name: "PostList",
  });
};
</script>

<style scoped></style>
