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

const currentImg = ref(0)

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
  <div class="popUp w-[100vw] select-none h-[100svh] fixed top-0 left-0 z-[99999] flex bg-[#2a2a2af6] items-center justify-center">
    <div class="relative">
      <div class="relative">
        <img @click="back()" v-if="currentImg > 0" src="../assets/gallery/Arrow.svg"
          class="rotate-180 opacity-80 absolute max-[600px]:left-0 max-[600px]:fixed max-[600px]:w-[40px] left-[-86px] top-[calc(50%-25px)]" alt="">
        <img @click="next()" v-if="currentImg < photos.length - 1" class="absolute max-[600px]:w-[40px] max-[600px]:fixed max-[600px]:top-50vh max-[600px]:right-0 right-[-86px] top-[calc(50%-25px)]"
          src="../assets/gallery/Arrow.svg" alt="">
          <slot></slot>
        <img class="w-[966px] max-[600px]:max-w-[78vw] max-[600px]:h-full  object-cover h-[651px]"
          src="../assets/gallery/IMG_2871.png" alt="">
      </div>
    </div>
  </div>
</template>