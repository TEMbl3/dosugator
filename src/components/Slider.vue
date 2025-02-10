<template>
  <div
    class="slider"
    @mousemove="handleHover"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- Слайды -->
    <div
      v-for="(image, index) in images"
      :key="index"
      class="slide"
      :class="{ active: activeSlide === index }"
      :style="{ backgroundImage: `url(${image})` }"
    ></div>

    <!-- Навигационные точки -->
    <div class="dots">
      <svg
        v-for="(image, index) in images"
        :key="`dot-${index}`"
        xmlns="../assets/svg/dot.svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        class="dot"
        :class="{ active: activeSlide === index}"
      >
        <circle cx="12" cy="17" r="6" fill="white" />
      </svg>
    </div>
  </div>
</template>

<script setup>


import { ref } from "vue";
import Gallery from "../assets/Gallery.png";
import Video from '../assets/Video.png'

// Массив фотографий
const images = [Gallery, Video, Gallery, Video, Gallery];

const activeSlide = ref(0);
let startX = 0;
let endX = 0;

function handleHover(event) {
  if (window.innerWidth <= 768) return;
  const { offsetX, currentTarget } = event;
  const width = currentTarget.offsetWidth;

  const segmentWidth = width / images.length;

  
  activeSlide.value = Math.floor(offsetX / segmentWidth);
}

function handleTouchStart(event) {
  startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  endX = event.touches[0].clientX;
}

function handleTouchEnd() {
  const swipeDistance = endX - startX;
  if (swipeDistance > 50 && activeSlide.value > 0) {
    activeSlide.value--;
  } else if (swipeDistance < -50 && activeSlide.value < images.length - 1) {
    activeSlide.value++;
  }
  startX = 0;
  endX = 0;
}
</script>

<style>
.slider {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  background: #f0f0f0;
}

/* Слайды */
.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
}

.slide.active {
  opacity: 1;
}

/* Контейнер точек */
.dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

/* Стили точек */
.dot {
  cursor: pointer;
opacity: 50%;
  transition: color 0.3s, transform 0.3s;
}

.dot.active {
  color: white;
  opacity: 100%;
}
</style>