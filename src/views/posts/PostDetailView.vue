<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ $dayjs(post.createdAt).format("YYYY-MM-DD") }}</p>
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
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deletePost, getPostById } from "@/api/posts";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const post = ref({});

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(props.id);
    // post.value = { ...data }; //객체를 통째로 넣어도 되지만 어떤값이 올지 모르니 필요한 값만 담을수 있게 만듬
    setPost(data);
  } catch (error) {
    console.error(error);
  }
};
const setPost = ({ title, content, createdAt }) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createdAt = createdAt;
};
fetchPost();

const remove = async () => {
  try {
    if (confirm("삭제하시겠습니까?") === false) return;
    await deletePost(props.id);
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

const goEdit = () => {
  router.push({
    name: "PostEdit",
    params: { id: props.id },
  });
};
</script>

<style scoped></style>
