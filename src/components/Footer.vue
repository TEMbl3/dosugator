<script setup>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import PopupPlace from "./PopupPlace.vue";
import PopupСommunication from "./PopupСommunication.vue";
import PopupArticle from "./PopupArticle.vue";
import { useNotification } from "@kyvg/vue3-notification"

const { notify } = useNotification()
const router = useRouter();
const route = useRoute();
const showPopup = ref(false);

function submitForm(event) {
  event.preventDefault(); // Останавливаем отправку формы
  notify({
    title: 'Отправлено',
    type: "success"
  })
}

import { onMounted, onUnmounted } from 'vue'

const excludedButton = ref(null);

// Метод, который будет вызываться
const handleGlobalClick = (event) => {
  // Проверяем, что клик произошёл НЕ на кнопке в футере
  if (excludedButton.value && !excludedButton.value.contains(event.target)) {
    methodToTrigger();
  }
};

const currentRoute = ref('')
const currentRouteName = ref('')

watch(
  () => route.path,
  (newPath) => {
    currentRouteName.value = route.name || '';
    console.log(currentRouteName.value);
  }
);

// Логика вызова
const methodToTrigger = () => {
  showPopupChose.value = false
  if(currentRouteName.value !== 'Error'){
    page.value = ''
  }
};

// Навешиваем и снимаем обработчик глобально
onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});

const page = ref("");
const showPopupPlace = ref(false);
const showPopupArticle = ref(false);
const showPopupChose = ref(false);
</script>

<template>
  <notifications class="z-[9999] mt-[10px]" position="top right" width="300px">
    <div class="notification-title">Info</div>
  </notifications>
  <PopupPlace v-if="showPopupPlace">
    <img @click="showPopupPlace = false" src="../assets/svg/x-close.svg" alt="" />
  </PopupPlace>
  <PopupArticle v-if="showPopupArticle">
    <img @click="showPopupArticle = false" src="../assets/svg/x-close.svg" alt="" />
  </PopupArticle>
  <div class="desktop-footer w-full pr-[14px] bg-[#F5F5F5] pt-[31px] items-center flex flex-col h-[216px]">
    <div class="flex gap-[611px]">
      <div class="flex-col flex ml-[100px]">
        <img src="../assets/logoWithoutText.png" class="max-h-[55px]" width="55px" alt="" />
        <a href="https://t.me/papanenadivane" class="mt-[31px] cursor-pointer mr-[5px]">Мы в Telegram</a>
      </div>
      <div class="">
        <p class="text-black font-[600] text-[15px]">
          Будь в курсе самого интересного в Москве
        </p>
        <form @submit.prevent="submitForm" class="relative w-[425px]">
          <input required placeholder="Твой e-mail"
            class="mt-[19px] focus:outline-none w-[320px] text-[14px] pl-[16px] z-0 rounded-l-[8px] h-[32px]"
            type="text" name="" id="" />
          <button
            class="absolute font-[300] bg-[#9FA4EA] pr-[5px] rounded-[8px] pl-[10px] h-[32px] mt-[19px] text-[14px] text-white z-10">
            Подписаться
          </button>
        </form>
      </div>
    </div>
    <div class="flex gap-[15px] select-none mt-[23px] mr-[26px]">
      <p class="cursor-pointer" @click="showPopup = true">Реклама на сайте</p>
      <p class="cursor-pointer" @click="router.push('/Simple')">
        Политика конфидентциальности
      </p>
      <p class="cursor-pointer" @click="router.push('/Simple')">
        Запросить удаление информации
      </p>
      <p class="cursor-pointer" @click="router.push('/Simple')">
        Отказ от ответсвенности
      </p>
      <p class="cursor-pointer" @click="showPopup = true">Написать нам</p>
    </div>
  </div>
  <div
    class="mobile-footer bg-white h-[82.5px] fixed left-0 bottom-0 gap-[30px] z-[10000] w-[100vw] items-center justify-center"
    style="box-shadow: 0 12px 20px black">
    <div @click="
      router.push('/List/All'), (showPopupPlace = false)
      " class="flex flex-col items-center gap-[10px]">
      <img v-if="currentRouteName !== 'List'" src="../assets/mobileFooter/mark.svg" alt="" />
      <img class="h-[24px]" v-else src="../assets/mobileFooter/markAct.svg" alt="" />
      <p class="text-[10px] leading-[12px] font-['Roboto'] text-[#515358]">
        Места
      </p>
    </div>
    <div @click="
      router.push('/ListArticles'), (showPopupPlace = false)
      " class="flex flex-col items-center gap-[10px]">
      <img v-if="currentRouteName !== 'ListArticles'" src="../assets/mobileFooter/star.svg" alt="" />
      <img class="w-[25px] ml-[-1px]" v-else src="../assets/mobileFooter/starAct.svg" alt="" />
      <p class="text-[10px] leading-[12px] font-['Roboto'] text-[#515358]">
        Подборки
      </p>
    </div>
    <div class="relative">
      <div @click="(showPopupChose = !showPopupChose)" ref="excludedButton" @click.stop
        class="flex flex-col items-center gap-[10px]">
        <img v-if="!showPopupChose" src="../assets/mobileFooter/message.svg" alt="" />
        <img class="mb-[2px] mt-[2px]" v-else src="../assets/mobileFooter/messageAct.svg" alt="" />
        <p class="text-[10px] leading-[12px] font-['Roboto'] text-[#515358]">
          Добавить
        </p>
      </div>
      <div ref="excludedButton" @click.stop v-if="showPopupChose"
        class="absolute w-[160px] flex flex-col border bottom-[50px] bg-white">
        <div @click="showPopupPlace = true, showPopupArticle = false, showPopupChose = false"
          class="px-2 py-1 focus:bg-zinc-300">Добавить место</div>
        <div @click="showPopupArticle = true, showPopupPlace = false, showPopupChose = false"
          class="px-2 py-1 focus:bg-zinc-300">Добавить статью</div>
      </div>
    </div>
    <div @click="
      router.push('/404'), page = 'favourite', (showPopupPlace = false)
      " class="flex flex-col items-center gap-[10px]">
      <img v-if="page !== 'favourite'" src="../assets/mobileFooter/favourite.svg" alt="" />
      <img class="mb-[2px] mt-[2px]" v-else src="../assets/mobileFooter/favouriteAct.svg" alt="" />
      <p class="text-[10px] leading-[12px] font-['Roboto'] text-[#515358]">
        Избранное
      </p>
    </div>
    <div @click="router.push('/404'), page = 'profile', (showPopupPlace = false)"
      class="flex flex-col items-center gap-[10px]">
      <img v-if="page !== 'profile'" src="../assets/mobileFooter/profile.svg" alt="" />
      <img class="mb-[2px] mt-[2px]" v-else src="../assets/mobileFooter/profileAct.svg" alt="" />
      <p class="text-[10px] leading-[12px] font-['Roboto'] text-[#515358]">
        Профиль
      </p>
    </div>
  </div>
  <PopupСommunication v-if="showPopup">
    <img @click="showPopup = false" src="../assets/svg/x-close.svg" alt="" />
  </PopupСommunication>
</template>

<style scoped>
p {
  letter-spacing: 0.1px;
}

.mobile-footer {
  display: none;
}

::placeholder {
  color: #acb1c6;
  font-weight: 300;
}

@media (max-width: 700px) {
  .desktop-footer {
    display: none;
  }

  .mobile-footer {
    display: flex;
  }
}
</style>
