<template>
  <form action="" @submit.prevent="">
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
  </form>
</template>

<script setup>
defineEmits(["change", "update"]);
defineProps({
  foo: String,
  bar: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped></style>
