<script setup>
import { ref } from 'vue'
import photo from '../assets/gallery/IMG_2871.png'

const photos = ref([{
  src: photo
}, {
  src: photo
}, {
  src: photo
}, {
  src: photo
}, {
  src: photo
}, {
  src: photo
}, {
  src: photo
}, {
  src: photo
}, {
  src: photo
}, {
  src: photo
}, {
  src: photo
}, {
  src: photo
},])

const currentImg = ref(-1)

const back = () => {
  if (currentImg.value > 0) {
    currentImg.value -= 1
  }
}
const next = () => {
  if (currentImg.value < photos.value.length - 1) {
    currentImg.value += 1
  }
}
</script>
<template>
  <div class="w-[1440px] select-none mb-[-180px] mx-auto">
    <div class="galleryAll justify-center mt-[25px] gap-[14px]">
      <img @click="currentImg = index, console.log(currentImg)" :src="item.src" v-for="(item, index) in photos"
        class="w-full h-full object-cover rounded-[10px]" />
    </div>
    <div v-if="currentImg >= 0"
      class="popUp w-[100vw] h-[100svh] fixed top-0 left-0 z-50 flex bg-[#2a2a2af6] items-center justify-center">
      <div class="relative">
        <img @click="back()" v-if="currentImg > 0" src="../assets/gallery/Arrow.svg"
          class="rotate-180 opacity-80 absolute left-[-86px] top-[calc(50%-25px)]" alt="">
        <img @click="next()" v-if="currentImg < photos.length - 1" class="absolute right-[-86px] top-[calc(50%-25px)]" src="../assets/gallery/Arrow.svg" alt="">
        <img @click="currentImg = -1" class="absolute right-[-115px] top-[-75px]" src="../assets/svg/close.svg"
          alt="">
        <img class="w-[966px] object-cover h-[651px]" :src="photos[currentImg].src" alt="">
      </div>
    </div>
  </div>
</template>
<style scoped>
.galleryAll {
  display: grid;
  grid-template-columns: 300px 300px 300px 300px;
  grid-template-rows: 192px 192px 192px 192px;
}
</style>