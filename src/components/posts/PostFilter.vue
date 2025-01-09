<template>
  <form>
    <div class="row g-3">
      <div class="col">
        <input
          :value="titleLike"
          @input="searchTitle"
          type="text"
          class="form-control"
          placeholder="제목으로 검색해주세요"
        />
      </div>
      <div class="col-3">
        <select
          :value="limit"
          @input="$emit('update:limit', Number($event.target.value))"
          name=""
          id=""
          class="form-select"
        >
          <option :value="6">6개씩 보기</option>
          <option :value="12">12개씩 보기</option>
          <option :value="18">18개씩 보기</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["update:limit", "update:title-like"]);
defineProps({
  titleLike: String,
  limit: Number,
});
const valid = ref(true);
const searchTitle = (e) => {
  console.log("이벤트 호출", e.target.value);
  if (valid.value === false) {
    return;
  }
  valid.value = false;
  console.log("첫번째 호출된후 리턴되어서 새로 추가 안됨", e.target.value);

  setTimeout(() => {
    emit("update:title-like", e.target.value);
    valid.value = true;
  }, 500);
};
</script>

<style scoped></style>
