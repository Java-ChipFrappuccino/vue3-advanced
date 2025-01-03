<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <AppFilter @submit.prevent="" v-model:limit="params._limit" />
    <!-- <form action="" @submit.prevent="">
      <div class="row g-3">
        <div class="col">
          <input v-model="params.title_like" type="text" class="form-control" />
        </div>
        <div class="col-3">
          <select v-model="params._limit" name="" id="" class="form-select">
            <option value="3">3개씩 보기</option>
            <option value="6">6개씩 보기</option>
            <option value="9">9개씩 보기</option>
          </select>
        </div>
      </div>
    </form> -->
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
    <AppPagination v-model:current-page="params._page" :page-count="pageCount">
    </AppPagination>
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
import AppPagination from "@/components/AppPagination.vue";
import AppFilter from "@/components/AppFilter.vue";
import { computed, ref, watchEffect } from "vue";
import { getPosts } from "@/api/posts";
import { useRouter } from "vue-router";

const router = useRouter();
const posts = ref([]);
const params = ref({
  _sort: "createdAt",
  _order: "desc",
  _page: 1,
  _limit: 3,
  title_like: "",
});

// 페이징 관련

const totalCount = ref(0); // 전체 게시글 수
const pageCount = computed(() => {
  return Math.ceil(totalCount.value / params.value._limit);
});
const fetchPosts = async () => {
  try {
    console.log("요청보냄");
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers["x-total-count"];
  } catch (error) {
    console.error(error);
  }
};
// fetchPosts();
watchEffect(fetchPosts);
const goPage = (id) => {
  router.push({
    //주소값에 이름이 있다면 주소값으로 객체를 넣어줄수도 있다
    name: "PostDetail",
    params: { id: id },
  });
};
</script>

<style scoped></style>
