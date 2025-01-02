<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="item in posts" :key="item.id" class="col-4">
        <PostItem
          :title="item.title"
          :content="item.content"
          :created-at="item.createdAt"
          @click="goPage(item.id)"
        />
      </div>
    </div>
    <hr class="my-4" />
    <AppCard>
      <PostDetailView :id="1" />
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import AppCard from "@/components/AppCard.vue";
import { ref } from "vue";
import { getPosts } from "@/api/posts";
import { useRouter } from "vue-router";

const router = useRouter();
const posts = ref([]);

const fetchPosts = async () => {
  try {
    const { data } = await getPosts();
    posts.value = data;
  } catch (error) {
    console.error(error);
  }
};
fetchPosts();

const goPage = (id) => {
  router.push({
    //주소값에 이름이 있다면 주소값으로 객체를 넣어줄수도 있다
    name: "PostDetail",
    params: { id: id },
  });
};
</script>

<style scoped></style>
