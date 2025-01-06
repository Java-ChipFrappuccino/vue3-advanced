// 컴포저블이란? 특정 기능을 여러곳에서 재사용하기 쉽게 로직을 모아두는 디자인패턴, 로직관리와 유지보수에 용이하다
// 컴포저블 함수를 만들때는 일반적으로 변수명앞에 use를 붙이는것이 관례다

import { ref } from "vue";

const alerts = ref([]);

function useAlert() {
  // const alerts = ref([]);
  const vAlert = (message, type = "error") => {
    // showAlert.value = true;
    // alertMessage.value = messasge;
    // alertType.value = type;
    alerts.value.push({ message, type });
    setTimeout(() => {
      // showAlert.value = false;
      alerts.value.shift();
    }, 2000);
  };
  const vSuccess = (message) => vAlert(message, "success");
  return { vSuccess, alerts, vAlert };
}

export default useAlert;
