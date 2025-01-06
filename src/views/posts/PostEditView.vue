<template>
  <AppLoading v-if="loading"></AppLoading>
  <AppError v-else-if="error" :message="error.message"></AppError>
  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <!-- <form @submit.prevent="edit">
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input v-model="form.title" type="text" class="form-control" id="title" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        v-model="form.content"
        class="form-control"
        id="content"
        rows="3"
      ></textarea>
    </div>
    <div class="pt-4">
      <button
        type="button"
        class="btn btn-outline-danger me-2"
        @click="goDetail"
      >
        취소
      </button>
      <button class="btn btn-outline-success">수정</button>
    </div>
  </form> -->
    <AppError v-if="editError" :message="editError.message"></AppError>
    <PostForm
      @submit.prevent="edit"
      v-model:title="form.title"
      v-model:content="form.content"
    >
      <template #actions>
        <div class="pt-4">
          <button
            type="button"
            class="btn btn-outline-secondary me-2"
            @click="goDetail"
          >
            목록
          </button>
          <button class="btn btn-outline-success" :disabled="editLoading">
            <template v-if="editLoading">
              <span
                class="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden" role="status">Loading...</span>
            </template>
            <template v-else>수정</template>
          </button>
        </div>
      </template>
    </PostForm>
  </div>

  <!-- <AppAlert
    :show="showAlert"
    :message="alertMessage"
    :type="alertType"
  ></AppAlert> -->
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPostById, updatePost } from "@/api/posts";
import useAlert from "@/composables/alert";
import PostForm from "@/components/posts/PostForm.vue";
import AppLoading from "@/components/app/AppLoading.vue";
import AppError from "@/components/app/AppError.vue";
const loading = ref(false);
const error = ref(null);
// import AppAlert from "@/components/app/AppAlert.vue";
// alert
const { vAlert, vSuccess, alerts } = useAlert();
const route = useRoute();
const router = useRouter();
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const form = ref({
  title: null,
  content: null,
  createdAt: null,
});
const fetchPost = async () => {
  try {
    loading.value = true;
    const { data } = await getPostById(props.id);
    // post.value = { ...data }; //객체를 통째로 넣어도 되지만 어떤값이 올지 모르니 필요한 값만 담을수 있게 만듬
    setForm(data);
  } catch (err) {
    error.value = err;
    vAlert("네트워크 오류!");
  } finally {
    loading.value = false;
  }
};
const setForm = ({ title, content, createdAt }) => {
  form.value.title = title;
  form.value.content = content;
  form.value.createdAt = createdAt;
};
fetchPost();

const editLoading = ref(false);
const editError = ref(null);
const edit = async () => {
  try {
    editLoading.value = true;

    await updatePost(props.id, { ...form.value });
    vSuccess("수정이 완료 되었습니다!");

    router.push({
      name: "PostDetail",
      params: { id: props.id },
    });
  } catch (err) {
    editError.value = err;
    vAlert(err);
  } finally {
    editLoading.value = false;
  }
};
const goDetail = () => {
  router.push({
    name: "PostDetail",
    params: { id: route.params.id },
  });
};
</script>

<style scoped></style>
