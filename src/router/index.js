import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import { getWithExpiry } from "../localStorage.js";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { auth: true } },
  { path: "/login", name: "Login", component: Login, meta: { auth: false } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const accessToken = getWithExpiry("access_token");
  if (to.meta.auth && !accessToken) {
    next({ name: "Login" });
  } else if (to.name === "Login" && accessToken) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
