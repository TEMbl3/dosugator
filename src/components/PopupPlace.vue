<template>
  <div class="flex max-[600px]:hidden w-[100vw] h-[100svh] z-20 fixed top-0 left-0 bg-[#2A2A2A] opacity-50" />
  <div style="box-sizing: border-box"
    class="flex min-w-[100vw] min-h-[100svh] z-[70] max-[600px]:fixed absolute max-[600px]:top-0 top-20 max-[600px]:max-h-[100svh] max-[600px]:pb-[80px] overflow-y-auto left-0 max-[600px]:block justify-center items-center">
    <div class="w-[812px] bg-white rounded-[12px]">
      <div class="flex item-center justify-between w-full px-[24px]">
        <h2 class="mr-auto text-[18px] pt-[24px] font-semibold leading-[28px] pb-[20px]">
          Добавить место
        </h2>
        <slot></slot>
      </div>
      <div class="border-b border-[#E9EAEB] w-full mb-[10px]"></div>
      <div
        class="w-[637px] px-[12px] py-[20px] mx-auto bg-[#FFF7ED] max-[600px]:max-w-full max-[600px]:w-[calc(100vw-48px)] max-[600px]:rounded-[8px]">
        <div class="flex items-center gap-[8px]">
          <img class="max-[600px]:w-[18px]" src="../assets/svg/Rules.svg" alt="" />
          <h3 class="text-[18px] font-medium font-['Inter'] text-[#292929] max-[600px]:text-[16px]">
            Правила размещения
          </h3>
        </div>
        <ol class="pl-[32px] mt-[5px] text-[14px] font-['Inter'] leading-[148%] text-[#525252] max-[600px]:text-[13px]">
          <li>
            1. Размер фотографии должен быть не меньше 300х300 пикселей, весом
            до 10 МБ
          </li>
          <li>
            2. Фотографии должны быть четкими, в формате JPEG, JPG, PNG, WEBP
          </li>
          <li>
            3. На фотографиях не должно быть стороннего изображения, не
            относящегося к описываемому месту
          </li>
        </ol>
      </div>
      <form @submit.prevent="submitForm()">
        <div class="inputs mt-[20px] px-[24px] flex flex-col gap-[16px] mb-[16px]">
          <input required
            class="focus:text-[18px] invalid:border-red-500 w-full max-[600px]:text-[14px] border border-[#D5D7DA] shadow-sm rounded-[8px] h-[44px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680]"
            placeholder="Ваше имя" type="text" />
          <input required
            class="focus:text-[18px] invalid:border-red-500 w-full max-[600px]:text-[14px] border border-[#D5D7DA] shadow-sm rounded-[8px] h-[44px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680]"
            placeholder="Ваш емейл" type="text" />
          <div class="border-b border-[#D5D7DA]"></div>
          <input required
            class="focus:text-[18px] invalid:border-red-500 w-full max-[600px]:text-[14px] border border-[#D5D7DA] rounded-[8px] shadow-sm h-[44px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680]"
            placeholder="Название места" type="text" />
          <input required
            class="focus:text-[18px] invalid:border-red-500 w-full max-[600px]:text-[14px] border border-[#D5D7DA] shadow-sm rounded-[8px] h-[44px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680]"
            placeholder="Адрес" type="text" />
          <select required
            class="w-full invalid:border-red-500 outline-none max-[600px]:text-[14px] border border-[#D5D7DA] shadow-sm rounded-[8px] h-[44px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680d8]"
            id="pet-select">
            <option value="">Категория</option>
            <option class="text-[#717680]" value="Playgrounds">
              Детские площадки
            </option>
            <option class="text-[#717680]" value="Educational">
              Познавательное
            </option>
            <option class="text-[#717680]" value="TheatersAndCircus">
              Театры/Цирк
            </option>
            <option class="text-[#717680]" value="Zoo">Зоопарки</option>
            <option class="text-[#717680]" value="Parks">Парки</option>
            <option class="text-[#717680]" value="GamingCentersAndAttractions">
              Игровые центры/Аттракционы
            </option>
            <option class="text-[#717680]" value="Restaurants">
              Рестораны
            </option>
            <option class="text-[#717680]" value="Events">Мероприятия</option>
          </select>
          <select required
            class="w-full invalid:border-red-500 outline-none max-[600px]:text-[14px] border border-[#D5D7DA] shadow-sm rounded-[8px] h-[44px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680d8]"
            id="pet-select">
            <option value="">Ограничения по возрасту</option>
            <option class="text-[#717680]" value="Все">Все</option>
            <option class="text-[#717680]" value="0+">0+</option>
            <option class="text-[#717680]" value="3+">3+</option>
            <option class="text-[#717680]" value="6+">6+</option>
            <option class="text-[#717680]" value="10+">10+</option>
          </select>
          <input required
            class="focus:text-[18px] invalid:border-red-500 w-full max-[600px]:text-[14px] border border-[#D5D7DA] shadow-sm rounded-[8px] h-[44px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680]"
            placeholder="Стоимость" type="text" />
          <input required
            class="focus:text-[18px] invalid:border-red-500 w-full max-[600px]:text-[14px] border border-[#D5D7DA] shadow-sm rounded-[8px] h-[44px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680]"
            placeholder="Режим работы" type="text" />
          <input required
            class="focus:text-[18px] invalid:border-red-500 w-full max-[600px]:text-[14px] border border-[#D5D7DA] shadow-sm rounded-[8px] h-[44px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680]"
            placeholder="Сайт" type="text" />
          <textarea required
            class="w-full max-[600px]:text-[14px] invalid:border-red-500 border border-[#D5D7DA] shadow-sm rounded-[8px] h-[56px] px-[14px] py-[10px] text-[16px] font-['Inter'] leading-[24px] text-[#717680]"
            placeholder="Описание" type="text" />
        </div>
        <div class="flex mx-[24px] w-[calc(100%-48px)] pt-[16px] border-t mt-[16px] items-start gap-[20px]">
          <img src="../assets/svg/uploadFile.svg" alt="" />
          <div class="w-[calc(100vw-132px)] w-max-full">
            <div
              class="upload-div items-center justify-center flex flex-col gap-[4px] cursor-pointer select-none rounded-[12px] border border-[#E9EAEB] w-full h-[74px]"
              @click="fileInput.click()">
              <h3 class="text-[14px] font-['Inter'] leading-[20px] font-semibold text-[#8F94EC]">
                Загрузите изображения
              </h3>
              <p class="text-[12px] px-[24px] text-center leading-[18px] text-[#535862] font-['Inter']">
                SVG, PNG, JPG or GIF (макс. 800x400px)
              </p>
            </div>
            <input type="file" ref="fileInput" style="display: none" />
          </div>
        </div>
        <div class="border-b border-[#E9EAEB] mt-[32px]"></div>
        <button
          class="m-[24px] w-[calc(100%-48px)] py-[10px] bg-[#8F94EC] text-[white] rounded-[8px] text-[16px] font-['Inter'] font-semibold leading-[24px] mb-[120px]">
          Отправить
        </button>
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
