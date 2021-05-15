import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Threads from "../views/Threads.vue";
import Thread from "../views/Thread.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import { component } from "vue/types/umd";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
  },
  {
    path: "/threads",
    name: "Threads",
    component: Threads,
  },
  {
    path: "/thread/:id",
    name: "Thread",
    component: Thread,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
