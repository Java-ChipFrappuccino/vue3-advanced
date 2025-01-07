<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 작성</h2>
    <hr class="my-4" />
  </div>
  <AppError v-if="error" :message="error.message"></AppError>

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
        <button class="btn btn-outline-success" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>저장</template>
        </button>
      </div>
    </template>
  </PostForm>
  <AppAlert :items="alerts"></AppAlert>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { createPost } from "@/api/posts";
import AppError from "@/components/app/AppError.vue";
import AppAlert from "@/components/app/AppAlert.vue";
import useAlert from "@/composables/alert";
import PostForm from "@/components/posts/PostForm.vue";
import { useAxios } from "@/hooks/useAxios";

// const loading = ref(false);
// const error = ref(null);
const router = useRouter();
const dayjs = inject("dayjs");
const visibleForm = ref(true);
const form = ref({
  title: null,
  content: null,
});
const { vAlert, vSuccess, alerts } = useAlert();

const { error, loading, execute } = useAxios(
  "posts/",
  {
    method: "POST",
  },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess("작성완료!");
      router.push({ name: "PostList" });
    },
    onError: (err) => {
      vAlert(err.message);
    },
  }
);
const save = async () => {
  execute({ ...form.value, createdAt: dayjs().format("YYYY-MM-DD") });
};

// const save = async () => {
//   try {
//     loading.value = true;
//     await createPost({
//       ...form.value,
//       createdAt: dayjs().format("YYYY-MM-DD"),
//     });
//     vSuccess("작성완료!");
//     router.push({ name: "PostList" });
//   } catch (err) {
//     vAlert(err);
//     error.value = err;
//   } finally {
//     loading.value = false;
//   }
// };
const goList = () => {
  router.push({
    name: "PostList",
  });
};
</script>

<style scoped></style>
