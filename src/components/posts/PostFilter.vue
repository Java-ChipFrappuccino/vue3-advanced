<template>
  <form>
    <div class="row g-3">
      <div class="col">
        <input
          :value="titleLike"
          @input="$emit('update:title-like', $event.target.value)"
          type="text"
          class="form-control"
          placeholder="제목으로 검색해주세요"
        />
      </div>
      <div class="col-3">
        <select
          :value="limit"
          @input="$emit('update:limit', $event.target.value)"
          name=""
          id=""
          class="form-select"
        >
          <option value="3">3개씩 보기</option>
          <option value="6">6개씩 보기</option>
          <option value="9">9개씩 보기</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
defineEmits(["update:limit", "update:title-like"]);
defineProps({
  titleLike: String,
  limit: Number,
});
</script>

<style scoped></style>
