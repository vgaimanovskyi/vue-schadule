import { createRouter, createWebHistory } from "vue-router";
import Calendar from "../views/Calendar.vue";

const routes = [
  {
    path: "/",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/Create.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
