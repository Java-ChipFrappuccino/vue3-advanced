import { computed, unref } from "vue";

export const useNumber = (number) => {
  console.log(number);

  const isOdd = computed(() => unref(number) % 2 === 1);
  console.log(isOdd.value);

  const isEven = computed(() => !isOdd.value);
  console.log(isEven.value);

  return { isOdd, isEven };
};
