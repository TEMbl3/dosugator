<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';
import Main from './pages/main.vue';
import List from './pages/List.vue'
import Map from './pages/Map.vue';
import Place from './pages/Place.vue';
import Article from './pages/Article.vue';
import ListArticles from './pages/ListArticles.vue';
import Error from './pages/404.vue'
</script>

<template>
  <Header />
  <router-view />
  <Footer />
</template>

<style>

</style>