<template>
  <AppLoading v-if="loading"></AppLoading>
  <AppError v-else-if="error" :message="error.message"></AppError>
  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ $dayjs(post.createdAt).format("YYYY-MM-DD") }}</p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message"></AppError>
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
        <button
          class="btn btn-outline-danger"
          @click="remove"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>삭제</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deletePost, getPostById } from "@/api/posts";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAlert from "@/composables/alert";
import AppLoading from "@/components/app/AppLoading.vue";
import AppError from "@/components/app/AppError.vue";
const router = useRouter();
const post = ref({});
const { vAlert, vSuccess } = useAlert();
const loading = ref(false);
const error = ref(null);
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const fetchPost = async () => {
  try {
    loading.value = true;
    const { data } = await getPostById(props.id);
    // post.value = { ...data }; //객체를 통째로 넣어도 되지만 어떤값이 올지 모르니 필요한 값만 담을수 있게 만듬
    setPost(data);
  } catch (err) {
    error.value = err;
    vAlert(err);
  } finally {
    loading.value = false;
  }
};
const setPost = ({ title, content, createdAt }) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createdAt = createdAt;
};
fetchPost();

const removeLoading = ref(false);
const removeError = ref(null);
const remove = async () => {
  try {
    removeLoading.value = true;
    if (confirm("삭제하시겠습니까?") === false) return;
    await deletePost(props.id);
    vSuccess("삭제 되었습니다!");
    router.push({ name: "PostList" });
  } catch (err) {
    vAlert(err);
    removeError.value = err;
  } finally {
    removeLoading.value = false;
  }
};
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
