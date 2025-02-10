<template>
  <div class="flex max-[600px]:hidden w-[100vw] h-[100svh] z-20 fixed top-0 left-0 bg-[#2A2A2A] opacity-50" />
  <div style="box-sizing: border-box;"
    class="flex min-w-[100vw] min-h-[100svh] z-[70] fixed max-[600px]:top-0 top-0 max-[600px]:min-h-[100vh] max-[600px]:bg-[white] max-[600px]:max-h-[100vh] max-[600px]:pb-[80px] overflow-y-auto left-0 max-[600px]:block justify-center items-center">
    <div class="w-[688px] bg-white rounded-[12px]">
      <div class="flex item-center justify-between w-full px-[24px]">
        <h2 class="mr-auto text-[18px] pt-[24px] font-semibold leading-[28px] pb-[20px]">
          Написать комментарий</h2>
        <slot></slot>
      </div>
      <div class="border-b border-[#E9EAEB] w-full mb-[10px]"></div>
      <form @submit.prevent="submitForm">
        <div class="inputs mt-[20px] px-[24px] flex flex-col gap-[16px] mb-[16px]">
          <input
            class="w-full max-[600px]:text-[14px] border border-[#D5D7DA] shadow-sm rounded-[8px] h-[44px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680]"
            placeholder="Ваше имя" type="text">
          <input
            class="w-full max-[600px]:text-[14px] border border-[#D5D7DA] shadow-sm rounded-[8px] h-[44px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680]"
            placeholder="Ваш емейл" type="text">
          <div class="border-b border-[#D5D7DA]"></div>
          <textarea
            class="w-full max-[600px]:text-[14px] border border-[#D5D7DA] shadow-sm rounded-[8px] h-[56px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680]"
            placeholder="Описание" type="text" />
        </div>
        <div
          class="flex mx-[24px] pb-[16px] border-b border-[#E9EAEB] w-[calc(100%-48px)] pt-[16px] border-t mt-[16px] items-start gap-[20px]">
          <img src="../assets/svg/uploadFile.svg" alt="">
          <div class="w-[calc(100vw-132px)] w-max-full">
            <div
              class="upload-div items-center justify-center flex flex-col gap-[4px] cursor-pointer select-none rounded-[12px] border border-[#E9EAEB] w-full h-[74px]"
              @click="fileInput.click()">
              <h3 class="text-[14px] font-['Inter'] leading-[20px] font-semibold text-[#8F94EC]">Загрузите изображения
              </h3>
              <p class="text-[12px] px-[24px] text-center leading-[18px] text-[#535862] font-['Inter']">SVG, PNG, JPG or
                GIF (макс. 800x400px)
              </p>
            </div>
            <input type="file" ref="fileInput" style="display: none;" />
          </div>
        </div>
        <div class="flex pl-[24px] pt-[16px]  items-center gap-[11px]">
          <p class="text-[16px] font-['Inter'] font-medium text-[#414651] leading-[20px]">Ваша оценка: </p>
          <div class="flex items-center">
            <img v-for="index in totalStars" :key="index"
              :src="index <= (hoveredStar ?? rating) ? filledStar : emptyStar" alt="star"
              class="w-[20px] h-[20px] cursor-pointer" @mouseover="onHoverStar(index)" @mouseleave="resetHover"
              @click="setRating(index)" />
          </div>
        </div>
        <div class="border-b border-[#E9EAEB] mt-[32px]"></div>
        <button
          class="m-[24px] w-[calc(100%-48px)] py-[10px] bg-[#8F94EC] text-[white] rounded-[8px] text-[16px] font-['Inter'] font-semibold leading-[24px]">Отправить</button>
      </form>
    </div>
  </div>
  <notifications class="z-[9999] mt-[10px]" position="top right" width="300px">
    <div class="notification-title">Info</div>
  </notifications>
</template>

<script setup>
import { onMounted, ref } from "vue";

const fileInput = ref(null);
const totalStars = 5;
const rating = ref(null);
const hoveredStar = ref(null);

import filledStar from '@/assets/stars/star.svg';
import emptyStar from '@/assets/stars/empty.svg';

const setRating = (index) => {
  rating.value = index;
};

const onHoverStar = (index) => {
  hoveredStar.value = index;
};

const resetHover = () => {
  hoveredStar.value = null;
};

import { useNotification } from "@kyvg/vue3-notification"

const { notify } = useNotification()

function submitForm(event) {
  event.preventDefault(); // Останавливаем отправку формы
  notify({
    title: 'Отправлено',
    type: "success"
  })
}

</script>

<script setup>

</script>
