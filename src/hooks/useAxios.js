import axios from "axios";
import { isRef, ref, unref, watchEffect } from "vue";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
const defaultConfig = {
  method: "get",
};
const defaultOptions = {
  immediate: true,
};
export const useAxios = (url, config = {}, options = {}) => {
  const response = ref(null); // 토탈 카운트를 받아오기 위해 헤더의 값들을 받아오는 리스폰스 객체를 만듬
  const loading = ref(false);
  const error = ref(null);
  const data = ref(null);
  const { params } = config;
  const { onSuccess, onError, immediate } = { ...defaultOptions, ...options };

  const execute = (body) => {
    error.value = null; //함수를 실행할때마다 에러와 데이터값을 초기화 한다, 안그러면 이전 값이 남아있어서 다른 데이터가 출력될 가능성이 있다
    data.value = null;

    loading.value = true;
    axios(unref(url), {
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === "object" ? body : {},
    })
      .then((res) => {
        response.value = res;
        data.value = res.data;
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        error.value = err;
        if (onError) onError(err);
      })
      .finally(() => {
        loading.value = false;
      });
  };
  if (isRef(params) || isRef(url)) {
    watchEffect(execute);
  } else {
    if (immediate) {
      execute();
    }
  }

  return { loading, error, data, response, execute };
};
