import AppAlert from "@/components/app/AppAlert.vue";
import AppCard from "@/components/app/AppCard.vue";
import AppGrid from "@/components/app/AppGrid.vue";
import AppModal from "@/components/app/AppModal.vue";
import AppPagination from "@/components/app/AppPagination.vue";

export default {
  install(app) {
    app.component("AppAlert", AppAlert);
    app.component("AppCard", AppCard);
    app.component("AppGrid", AppGrid);
    app.component("AppModal", AppModal);
    app.component("AppPagination", AppPagination);
  },
};

// 전역적으로 쓰이는 컴포넌트들을 모아서 플러그인으로 만든다음에 main.js에서 불러와서 설치해주면 매번 같은 파일을 임포트하는 수고를 덜수있다
