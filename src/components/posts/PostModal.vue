<template>
  <AppModal v-model="show" title="게시글">
    <template #default>
      <div class="row g-3">
        <div class="col-3 text-muted">제목</div>
        <div class="col-9">{{ title }}</div>
        <div class="col-3 text-muted">내용</div>
        <div class="col-9">{{ content }}</div>
        <div class="col-3 text-muted">등록일</div>
        <div class="col-9">{{ createdAt }}</div>
      </div>
    </template>
    <template #actions>
      <button @click="closeModal" type="button" class="btn btn-secondary">
        닫기
      </button>
    </template>
  </AppModal>
</template>

<script setup>
import AppModal from "@/components/app/AppModal.vue";
import { computed } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Boolean,
  title: String,
  content: String,
  createdAt: [String, Number],
});
const show = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
  },
});
function closeModal() {
  show.value = false;
}
</script>

<style scoped></style>
