import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/servants",
    name: "servants",
    component: () => import("./components/ServantsList"),
  },
  {
    path: "/servants/:id",
    name: "servant-details",
    component: () => import("./components/MyServant"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddServant"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
