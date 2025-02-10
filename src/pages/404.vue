<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

</script>
<template>
  <div class="mx-auto flex relative flex-col items-center w-[1208px]">
    <img @click="router.push('/')" class="absolute top-[18px] hidden max-[600px]:block left-[21px] w-[16px]"
      src="../assets/place/Chevron_Down.svg" alt="">
    <h2 class="text-[64px] max-[600px]:text-[30px] font-['Inter'] mt-[31px]">ОЙ!</h2>
    <p class="text-[24px] font-['Inter'] max-[600px]:text-[18px] mt-[33px]">страница в разработке</p>
    <img src="../assets/svg/404.svg" class="mt-[80px] max-[600px]:w-[320px] mb-[100px]" alt="">
    <a @click="router.push('/')"
      class="flex items-center max-[600px]:text-[18px] gap-[8px] text-[24px] cursor-pointer font-['Inter'] mb-[100px]"><img
        class="max-[600px]:w-[25px]" src="../assets/svg/Arrow-28.svg" alt="">Назад</a>
  </div>
</template>

<style></style>