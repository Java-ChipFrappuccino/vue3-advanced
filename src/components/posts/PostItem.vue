<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <p class="text-muted">{{ createdAt }}</p>
  </AppCard>
</template>

<script setup>
import AppCard from "../AppCard.vue";

defineProps({
  title: String,
  content: String,
  createdAt: [String, Date, Number],
});
</script>

<style scoped></style>
