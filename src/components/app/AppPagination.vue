<template>
  <nav class="mt-5" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a
          @click.prevent="$emit('page', props.currentPage - 1)"
          :class="isPrevious"
          class="page-link"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in pageCount"
        :key="page"
        class="page-item"
        :class="{ active: page === currentPage }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="$emit('update:currentPage', page)"
          >{{ page }}</a
        >
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('page', props.currentPage + 1)"
          :class="isNext"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from "vue";
const isNext = computed(() =>
  props.currentPage >= props.pageCount ? "disabled" : ""
);
const isPrevious = computed(() => (props.currentPage <= 1 ? "disabled" : ""));
defineEmits(["update:currentPage"]);
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
});
console.log(props.currentPage);
</script>

<style scoped></style>
