<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
  </div>
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
        <button class="btn btn-outline-success">저장</button>
      </div>
    </template>
  </PostForm>
  <!-- <AppAlert
    :show="showAlert"
    :message="alertMessage"
    :type="alertType"
  ></AppAlert> -->
  <Teleport to="body">
    <AppAlert :items="alerts"></AppAlert>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPostById, updatePost } from "@/api/posts";
import useAlert from "@/composables/alert";
import PostForm from "@/components/posts/PostForm.vue";
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
    const { data } = await getPostById(props.id);
    // post.value = { ...data }; //객체를 통째로 넣어도 되지만 어떤값이 올지 모르니 필요한 값만 담을수 있게 만듬
    setForm(data);
  } catch (error) {
    console.error(error);
    vAlert("네트워크 오류!");
  }
};
const setForm = ({ title, content, createdAt }) => {
  form.value.title = title;
  form.value.content = content;
  form.value.createdAt = createdAt;
};
fetchPost();
const edit = async () => {
  try {
    await updatePost(props.id, { ...form.value });
    vSuccess("수정이 완료 되었습니다!");

    setTimeout(() => {
      router.push({
        name: "PostDetail",
        params: { id: props.id },
      });
    }, 50);
  } catch (error) {
    console.error(error);
    vAlert(error);
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
