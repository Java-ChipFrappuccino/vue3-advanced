import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import PostListView from "@/views/posts/PostListView.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import PostCreateView from "@/views/posts/PostCreateView.vue";
import PostEditView from "@/views/posts/PostEditView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import NestedView from "@/views/nested/NestedView.vue";
import NestedOneView from "@/views/nested/NestedOneView.vue";
import NestedTwoView from "@/views/nested/NestedTwoView.vue";
import NestedHomeView from "@/views/nested/NestedHomeView.vue";
import NestedOneHomeView from "@/views/nested/NestedOneHomeView.vue";
import NestedOneAndOneView from "@/views/nested/NestedOneAndOneView.vue";
import NestedOneAndTwoView from "@/views/nested/NestedOneAndTwoView.vue";
import MypageView from "@/views/MypageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "About",
      component: AboutView,
    },
    {
      path: "/posts",
      name: "PostList",
      component: PostListView,
    },
    {
      path: "/posts/:id",
      name: "PostDetail",
      // props: true, // props 속성을 true로 설정하면 URL 파라미터를 컴포넌트의 props로 전달합니다.
      props: (route) => ({ id: Number(route.params.id) }),
      component: PostDetailView,
    },
    {
      path: "/posts/create",
      name: "PostCreate",
      component: PostCreateView,
    },
    {
      path: "/posts/:id/edit",
      name: "PostEdit",
      props: (route) => ({ id: Number(route.params.id) }),
      component: PostEditView,
    },
    {
      path: "/nested",
      name: "Nested",
      component: NestedView,
      children: [
        // NestedView 컴포넌트의 하위 라우터를 정의합니다. 그럼 NestedView 안에서 중첩된 라우터뷰를 쓸수있다
        {
          path: "",
          name: "NestedHome",
          component: NestedHomeView,
        },
        {
          path: "one",
          name: "NestedOne",
          component: NestedOneView,
          redirect: { name: "NestedOneHome" },
          children: [
            {
              path: "",
              name: "NestedOneHome",
              component: NestedOneHomeView,
            },
            {
              path: "one/1",
              name: "NestedOneAndOne",
              component: NestedOneAndOneView,
            },
            {
              path: "one/2",
              name: "NestedOneAndTwo",
              component: NestedOneAndTwoView,
            },
          ],
        },
        {
          path: "two",
          name: "NestedTwo",
          component: NestedTwoView,
        },
      ],
    },
    {
      path: "/my",
      name: "MyPage",
      component: MypageView,
      beforeEnter: (to, from) => {
        // console.log("beforeEnter to: ", to);
        // console.log("beforeEnter from: ", from);
        // return "/";
        console.log(to.query);
        return removeQuery(to); // 이런식으로 배열에 담아서 여러개의 가드를 설정할수도 있다/ 테스트해보니 안되는데 이유 아직 모름
      },
    },

    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
    // 라우터는 위에서부터 아래로 순차적으로 검사하기 때문에 NotFoundView는 가장 마지막에 위치해야 합니다.
    //모든 경로에 대한 매칭이 실패하는 모든 경우의 url값(정규식 사용, .*는 모든문자, *은 모든 / / 사이의 값들을 추적한다)을 받아 NotFoundView로 이동합니다.
  ],
});

function removeQuery(to) {
  if (Object.keys(to.query).length > 0) {
    // to.query가 객체이므로 객체의 키값이 1개 이상이면 원래 주소로 가고 쿼리는 비워주는 코드
    return { path: to.path, query: {} };
  }
}
// router.beforeEach((to, from) => {
//   // 첫번째 인자는 갈곳, 두번째는 있던곳
//   console.log(to);
//   console.log(from);
//   if (to.name === "MyPage") {
//     return false; // false를 반환 하면 이동을 막는다
//     // return { name: "NestedOne"}; // 다른 주소로 리디렉션 시킬수도 있다
//     // return '/posts'; // 직접주소로 리디렉션 시킬수도 있다
//   }
// });

export default router;
