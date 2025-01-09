<template>
  <AppCard>
    <h5 class="card-title text-truncate">{{ title }}</h5>
    <p class="card-text text-truncate">
      {{ content }}
    </p>
    <p class="text-muted">{{ createdAt }}</p>
    <template #footer>
      <div class="d-flex justify-content-end">
        <button class="btn p-0 me-2" @click.stop="$emit('preview')">
          <i class="bi bi-caret-down"></i>
        </button>
        <button class="btn p-0" @click.stop="$emit('modal')">
          <i class="bi bi-card-text"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
// import AppCard from "../app/AppCard.vue";

defineProps({
  title: String,
  content: String,
  createdAt: [String, Date, Number],
});
defineEmits(["modal", "preview"]);
</script>

<style scoped></style>
