import focus from "@/directive/focus";
import color from "@/directive/color";

export default {
  install(app) {
    app.directive("focus", focus);
    app.directive("color", color);
  },
};

// 전역적으로 쓰이는 디렉티브들을 모아서 플러그인으로 만든다음에 main.js에서 불러와서 설치해주면 매번 같은 파일을 임포트하는 수고를 덜수있다
// 디렉티브란? 주로 low-level돔관련 HTML요소를 직접 조작하는 로직을 커스텀화해서 재사용하는것, 포커싱 옵션이라던가 색깔 변경이라던가,
// 일반 html속성을 사용해도 되지만 맨 처음 로딩될때만 적용되므로 동적으로 변화하는 컴포넌트들에서 일관성있는 스타일을 보장하기위해 사용
