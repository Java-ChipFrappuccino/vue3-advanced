import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import globalComponents from "./plugins/global-components";
import globalDirective from "./plugins/global-directive";
import dayjs from "./plugins/dayjs";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(dayjs);
app.use(router);
app.use(globalComponents);
app.use(globalDirective);
app.mount("#app");

console.log(import.meta.env.MODE);
console.log(import.meta.env.BASE_URL);
console.log(import.meta.env.PROD);
console.log(import.meta.env.DEV);
console.log(import.meta.env.VITE_APP_API_URL);
