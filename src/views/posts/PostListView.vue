<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter
      @submit.prevent=""
      v-model:limit="params._limit"
      v-model:title-like="params.title_like"
    />
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
    <AppLoading v-if="loading"></AppLoading>
    <AppError v-else-if="error" :message="error.message"></AppError>
    <template v-else>
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
          />
        </template>
      </AppGrid>
      <AppPagination
        v-model:current-page="params._page"
        :page-count="pageCount"
      >
      </AppPagination>
    </template>
    <!-- <AppModal v-model="show" title="게시글">
      <template #default>
        <div class="row g-3">
          <div class="col-3 text-muted">제목</div>
          <div class="col-9">{{ modalTitle }}</div>
          <div class="col-3 text-muted">내용</div>
          <div class="col-9">{{ modalContent }}</div>
          <div class="col-3 text-muted">등록일</div>
          <div class="col-9">{{ modalCreatedAt }}</div>
        </div>
      </template>
      <template #actions>
        <button @click="show = !show" type="button" class="btn btn-secondary">
          닫기
        </button>
      </template>
    </AppModal> -->
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreatedAt"
      ></PostModal>
    </Teleport>
    <hr class="my-4" />
    <AppCard>
      <PostDetailView :id="1" />
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
// import AppCard from "@/components/app/AppCard.vue";
// import AppGrid from "@/components/app/AppGrid.vue";
import PostModal from "@/components/posts/PostModal.vue";
// import AppPagination from "@/components/app/AppPagination.vue";
import PostFilter from "@/components/posts/PostFilter.vue";
import { computed, ref, watchEffect } from "vue";
import { getPosts } from "@/api/posts";
import { useRouter } from "vue-router";
import AppLoading from "@/components/app/AppLoading.vue";
import AppError from "@/components/app/AppError.vue";
import { useAxios } from "@/hooks/useAxios.js";

const router = useRouter();
// const loading = ref(false);
// const error = ref(null);
// const posts = ref([]);
const params = ref({
  _sort: "createdAt",
  _order: "desc",
  _page: 1,
  _limit: 3,
  title_like: "",
});

const {
  data: posts,
  response,
  loading,
  error,
} = useAxios("/posts", { params });

// 페이징 관련

// const totalCount = ref(0); // 전체 게시글 수
const totalCount = computed(() => {
  return response.value.headers["x-total-count"];
});
const pageCount = computed(() => {
  return Math.ceil(totalCount.value / params.value._limit);
});

// const fetchPosts = async () => {
//   try {
//     loading.value = true;
//     console.log("요청보냄");
//     const { data, headers } = await getPosts(params.value);
//     posts.value = data;
//     totalCount.value = headers["x-total-count"];
//   } catch (err) {
//     error.value = err;
//   } finally {
//     loading.value = false;
//   }
// };

// 모달 관련
const show = ref(false);
const modalTitle = ref("");
const modalContent = ref("");
const modalCreatedAt = ref("");
const openModal = ({ title, content, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
};

// fetchPosts();
// watchEffect(fetchPosts);
const goPage = (id) => {
  router.push({
    //주소값에 이름이 있다면 주소값으로 객체를 넣어줄수도 있다
    name: "PostDetail",
    params: { id: id },
  });
};
</script>

<style scoped></style>
