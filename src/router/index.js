import { createRouter, createWebHistory } from "vue-router";

import Main from "../pages/main.vue";
import Place from "../pages/Place.vue";
import Map from "../pages/Map.vue";
import List from "../pages/List.vue";
import Article from "@/pages/Article.vue";
import ListArticles from "../pages/ListArticles.vue";
import Error from "../pages/404.vue";
import Simple from '@/pages/Simple.vue'

const routes = [
  { path: "/", name: "Main", component: Main },
  { path: "/Map", name: "Map", component: Map },
  { path: "/Place", name: "Place", component: Place },
  { path: "/List/:category?", name: "List", component: List, props: true },
  { path: "/Article", name: "Article", component: Article },
  { path: "/ListArticles", name: "ListArticles", component: ListArticles },
  { path: "/:catchAll(.*)", redirect: "404" },
  { path: "/404", name: "Error", component: Error },
  {path: "/Simple", name: 'Simple', component: Simple}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // для того чтобы скрол при возврате назад сохранялся, запомни уже сука
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;
