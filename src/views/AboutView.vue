<template>
  <div>
    <h2>About</h2>
    <p></p>
    <h2>Store</h2>
    <p>counter: {{ counter }}</p>
    <p>doubleCounter: {{ doubleCount }}</p>
    <button @click.prevent.stop="increment" class="btn btn-outline-success">
      Click!
    </button>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
const store = useCounterStore();
const { doubleCount, counter } = storeToRefs(store);
const { increment } = store;
</script>

<style scoped></style>
