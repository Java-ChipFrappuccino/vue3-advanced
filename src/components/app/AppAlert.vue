<template>
  <!-- <Transition name="slide">
    <div v-if="show" class="app-alert alert" :class="typeStyle" role="alert">
      {{ message }}
    </div>
  </Transition> -->
  <div class="app-alert">
    <TransitionGroup name="slide">
      <div
        v-for="({ message, type }, index) in items"
        :key="index"
        class="alert"
        :class="typeStyle(type)"
        role="alert"
      >
        {{ message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import useAlert from "@/composables/alert";

// import { computed } from "vue";
// defineProps({
//   items: Array,
// });
const { alerts: items } = useAlert();

// const props = defineProps({
//   show: {
//     type: Boolean,
//     default: false,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     default: "error",
//     validator: (value) => ["success", "error"].includes(value),
//   },
// });
// const typeStyle = computed((e) =>
//   e === "error" ? "alert-danger" : "alert-success"
// );
const typeStyle = (type) =>
  type === "error" ? "alert-danger" : "alert-success";
</script>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.slide-enter-active,
.slide-leave-active {
  transition: 0.5s ease;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0px);
}
</style>
