import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Browse from "../views/Browse.vue";
import { ACCESS_TOKEN, getWithExpiry } from "../localStorage";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { auth: true } },
  { path: "/login", name: "Login", component: Login, meta: { auth: false } },
  { path: "/browse", name: "Browse", component: Browse, meta: { auth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const accessToken = getWithExpiry(ACCESS_TOKEN);
  if (to.meta.auth && !accessToken) {
    next({ name: "Login" });
  } else if (to.name === "Login" && accessToken) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
