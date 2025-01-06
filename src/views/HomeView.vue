<template>
  <div>
    <h2>Home</h2>
    <!-- <p>{{ $route.name }}</p> -->
    <DrawingComp />
    <hr />
    <AppGrid :items="items" col-class="col-3" v-slot="{ item }">
      <AppCard>{{ item }}</AppCard>
    </AppGrid>
  </div>
</template>

<script setup>
import DrawingComp from "@/components/app/DrawingComp.vue";
// import AppGrid from "@/components/app/AppGrid.vue";
// import AppCard from "@/components/app/AppCard.vue";
import { ref } from "vue";
const items = ref(["사과", "딸기", "바나나", "파인애플"]);
</script>

<style scoped></style>
