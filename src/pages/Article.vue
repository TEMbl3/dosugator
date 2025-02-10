<script setup>
import { ref } from "vue";
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import PopupFeedbackPhone from "@/components/PopupFeedbackPhone2.vue";

import CurrentImg from '../components/CurrentImg.vue'
const router = useRouter();

const showScrollButton = ref(false);
// Порог для появления кнопки (3 экрана вниз)
const scrollThreshold = 1 * window.innerHeight;

// Метод для прокрутки страницы наверх
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Обработчик события прокрутки
const handleScroll = () => {
  showScrollButton.value = window.scrollY > scrollThreshold;
};

// Жизненные циклы: монтирование компонента и удаление события при разрушении
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const scrollToAnchor = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
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


function handleClickOutside(event) {
  // Проверяем, что клик не в элементе с атрибутом data-click-outside
  if (!event.target.closest("[data-click-outside]")) {
    repost.value = false;
  }
}

const favouriteHover = ref(false);
const repost = ref(false);
const favourite = ref(false);
const CurrentImgOpen = ref(false);

const visible = ref(false);
let startTouchY = 0;
let endTouchY = 0;

const handleTouchStart = (event) => {
  // Запоминаем начальную позицию касания
  startTouchY = event.touches[0].clientY;
};

const handleTouchMove = (event) => {
  // Запоминаем текущую позицию касания
  endTouchY = event.touches[0].clientY;

  // Проверяем, что свайп вниз
  if (startTouchY < endTouchY) {
    // Можно добавить логику для визуальной реакции на свайп
  }
};

const handleTouchEnd = () => {
  // Проверяем, если свайп был достаточно длинным, скрываем элемент
  if (endTouchY - startTouchY > 50) {
    visible.value = false; // Скрываем элемент
  }
};
</script>

<template>
  <notifications class="z-[9999] mt-[10px]" position="top right" width="300px">
    <div class="notification-title">Info</div>
  </notifications>
  <PopupFeedbackPhone class="z-[50]" v-if="visible">
    <template #swipe>
      <div @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"
        class="w-[100vw] absolute h-[50px] pt-[10px] mb-[5px]">
        <img @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" class="mx-auto "
          src="../assets/svg/swipe.svg" alt="" />
      </div>
    </template>
    <template #close>
      <img class="z-[100]" @click="visible = false" src="../assets/svg/x-close.svg" alt="">
    </template>
  </PopupFeedbackPhone>
  <CurrentImg v-if="CurrentImgOpen"><img @click="CurrentImgOpen = false"
      class="absolute max-[600px]:right-0 max-[600px]:top-[-40px] right-[-115px] top-[-75px]"
      src="../assets/svg/close.svg" alt="" /></CurrentImg>
  <a v-show="showScrollButton" @click="scrollToTop" style="box-shadow: 0 0 7px #8f92b2"
    class="fixed bottom-[120px] right-[20px] ml-auto mr-[5px] z-10 bg-white flex items-center justify-center w-[26px] h-[26px] border rounded-[50%]"><img
      class="rotate-90" src="../assets/place/Chevron_Down.svg" alt="" /></a>
  <div @click="handleClickOutside" class="mx-auto max-[600px]:hidden flex flex-col items-center w-[1208px]">
    <div class="flex mt-[10px] items-center gap-[5px] mr-auto w-full relative">
      <img @click="router.push('/')" src="../assets/Home.svg" alt="" />
      <img src="../assets/chevron-right.png" alt="" />
      <p @click="router.push('/ListArticles')"
        class="font-['Mulish'] text-[14px] cursor-pointer leading-[150%] text-[#5B6476]">
        Список статей
      </p>
      <img src="../assets/chevron-right.png" alt="" />
      <p class="font-['Mulish'] text-[14px] leading-[150%] text-[#A2A1F1]">
        Название статьи
      </p>
    </div>
    <div class="flex items-center gap-[41px] mt-[14px]">
      <img class="w-[791px] h-[400px] rounded-[20px]" src="../assets/Gallery.png" alt="" />
      <div @click="router.push('/404')" class="w-[372px] h-[400px] flex flex-col items-center border border-[#EFF0F6] rounded-[30px] shadow-sm">
        <p class="text-[16px] font-medium font-['Inter'] mt-[12px] mb-[12px] cursor-pointer"
          @click="router.push('/404')">
          Об авторе
        </p>
        <img src="../assets/Author.png" alt="" />
        <h2 class="text-[20px] leading-[46px] font-['Roboto'] font-medium">
          Папа не на диване
        </h2>
        <div class="flex items-center gap-[15px] mb-[10px]">
          <img src="../assets/socials/Telegram.svg" alt="" />
          <img src="../assets/socials/Social.svg" alt="" />
        </div>
        <p class="font-['Roboto'] text-[14px] leading-[20px] text-[#292929] w-[273px] text-center">
          Вот кратенькая инфа об авторе тут еще побольше может или совсем кратко
          и его соцсеточки
        </p>
      </div>
    </div>
    <div class="flex">
      <div class="flex flex-col mt-[23px] w-[789px] mr-auto">
        <h2 class="text-[24px] font-semibold font-['Inter'] mb-[10px]">
          Название этой статьи
        </h2>
        <div class="flex justify-between">
          <div class="flex items-center gap-[18px]">
            <p class="font-['Inter'] text-[18px] text-[#848282]">19.02.2024</p>
            <div @click="scrollToAnchor('comment')" class="flex items-center gap-[4px]">
              <img class="mt-[-2px]" src="../assets/svg/Comment.svg" alt="" />
              <p class="text-[#848282]">25</p>
            </div>
            <div class="flex items-center gap-[4.5px]">
              <img class="w-[24px]" src="../assets/svg/eye.svg" alt="" />
              <p class="text-[#848282]">1025</p>
            </div>
          </div>
          <div class="flex items-center gap-[15px]">
            <div data-click-outside class="relative select-none">
              <div @click="repost = !repost" class="flex cursor-pointer items-center gap-[4px]">
                <img class="w-[20px] h-[20px]" src="../assets/svg/upload.svg" alt="" />
                <p class="font-['Inter'] text-[18px] text-[#848282]">
                  Поделиться
                </p>
              </div>
              <div v-if="repost"
                class="absolute flex flex-col left-[-55px] bottom-[35px] justify-center w-[220px] bg-white shadow-md rounded">
                <div @click="repost = false"
                  class="cursor-pointer flex px-[10px] py-[5px] font-['Inter'] hover:bg-zinc-200 rounded-t items-center gap-[5px] text-[16px] mt-[1px]">
                  <img class="w-[20px]" src="../assets/svg/url.svg" alt="" />
                  <p class="break-normal">Скопировать ссылку</p>
                </div>
                <div @click="repost = false"
                  class="cursor-pointer flex px-[10px] py-[5px] font-['Inter'] hover:bg-zinc-200 items-center gap-[5px] text-[16px] mt-[1px]">
                  <img class="w-[20px]" src="../assets/svg/vk.svg" alt="" />
                  <p class="break-normal">ВКонтакте</p>
                </div>
                <div @click="repost = false"
                  class="cursor-pointer flex px-[10px] py-[5px] font-['Inter'] hover:bg-zinc-200 rounded-b items-center gap-[5px] text-[16px] mt-[1px]">
                  <img class="w-[17px] mx-[1.5px]" src="../assets/svg/telegram.svg" alt="" />
                  <p class="break-normal">Telegram</p>
                </div>
              </div>
            </div>
            <div @click="favourite = !favourite" @mouseenter="favouriteHover = true"
              @mouseleave="favouriteHover = false" class="flex items-center gap-[4px] cursor-pointer select-none">
              <img v-if="!favourite && !favouriteHover" class="" src="../assets/svg/Vector.svg" alt="" />
              <img class="w-[16px] mr-[1px] mt-[0px]" v-if="favourite || favouriteHover"
                src="../assets/svg/FavouriteTrue.svg" alt="" />
              <p class="font-['Inter'] text-[18px] text-[#848282]">Сохранить</p>
            </div>
          </div>
        </div>
        <div class="pt-[13px] border-t border-[#D0D0D0] mt-[29px]">
          <p class="font-['Roboto'] text-[20px] leading-[32px] text-[#292929] mb-[31px]">
            Привет, вот это классно что мы проехали по такому маршруту и вот как
            круто супер круто вот и тут и там и здесь и все классно ваще
          </p>
          <img class="w-[791px] h-[381px] object-cover rounded-[10px]" src="../assets/Gallery.png" alt="" />
          <p class="mt-[12px] text-[14px] text-center leading-[14px] text-[#292929] opacity-60 font-['Inter']">
            Описание фоточки
          </p>
        </div>
        <div class="mt-[78px]">
          <h2 class="text-[24px] font-semibold text-['Roboto'] leading-[30px] text-[#292929]">
            Маршрут 2
          </h2>
          <p class="mt-[16px] font-['Roboto'] text-[20px] leading-[32px] text-[#292929] mb-[48px]">
            Тут я еще и видосиков наснимал как клево мы ходили гугляли хуи
            пинали и ваще ахуенчик нагугляли гляньте
          </p>
          <!-- В будущем должно быть видео снизу -->
          <img src="../assets/video.png" alt="" />
          <p class="mt-[12px] text-[14px] text-center leading-[14px] text-[#292929] opacity-60 font-['Inter']">
            Описание видео
          </p>
        </div>
        <div
          class="mt-[79px] mb-[55px] flex flex-col pl-[29px] pt-[32px] border border-[#EFF0F6] shadow-sm w-[791px] rounded-[30px]">
          <h2 id="comment" class="font-['Roboto'] mr-auto font-semibold text-[24px]">
            Комментарии
          </h2>
          <form @submit.prevent="submitForm"
            class="mt-[27px] rounded-[8px] border-[1px] p-[20px] border-[#8F94EC] shadow w-[700px]">
            <input required placeholder="Введите отзыв" type="text"
              class="w-full font-['Inter'] text-[15px] leading-[28px] pb-[15px] border-b focus:outline-none" />
            <div class="flex justify-between mt-[15px]">
              <p class="text-[16px] leading-[28px] text-[#9F9F9F] font-light font-['Roboto']">
                Комментарии проходят модерацию
              </p>
              <button
                class="bg-[#8F94EC] rounded-[8px] w-[126px] h-[44px] text-[16px] font-['Inter'] font-medium leading-[28px] text-white">
                Отправить
              </button>
            </div>
          </form>
          <div class="mt-[40px] mb-[73px]">
            <div class="flex items-center gap-[12px]">
              <img @click="router.push('/404')" class="cursor-pointer" src="../assets/avatar.png" alt="" />
              <div class="flex flex-col">
                <p @click="router.push('/404')"
                  class="cursor-pointer font-[700] font-['Inter'] leading-[20px] text-[15px]">
                  Юлька
                </p>
                <p class="font-['Roboto'] text-[14px] text-[#848282]">
                  19.02.2024
                </p>
              </div>
            </div>
            <p class="max-w-[343px] mt-[15px]">
              Ха я вот написал и никто не знает кто я а мне пофигу
            </p>
          </div>
          <button
            class="w-[700px] mb-[11px] bg-[#F1F2F3] rounded-[6px] text-['Roboto'] font-[600] text-[14px] h-[36px]">
            Загрузить ещё
          </button>
        </div>
      </div>
      <div
        class="w-[376px] shadow-sm ml-[41px] mt-[24px] gap-[20px] h-[668px] border flex flex-col items-center border-[#EFF0F6] rounded-[30px]">
        <p class="font-['Inter'] font-[600] mt-[18px] text-[20px]">
          Вам может понравится
        </p>
        <div @click="router.push('/Article')" class="flex cursor-pointer" v-for="item in 5">
          <img src="../assets/Gallery.png" class="w-[150px] h-[100px] rounded-l-[10px]" alt="" />
          <div class="w-[194px] h-[100px] bg-[#F5F5F6] rounded-r-[10px] py-[9px] px-[16px]">
            <h4 class="font-['Roboto'] font-[500] text-[16px] leading-[28px] text-[#252527]">
              Парк Лукоморье
            </h4>
            <p class="font-['Inter'] text-[11px] leading-[18px] text-[#888888]">
              Парк сказок «Лукоморье» в Совхозе имени Ленина. Один из лучших
              парков-...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- телефонная версия  -->
  <div @click="handleClickOutside"
    class="w-[90vw] overflow-x-hidden over pb-[100px] mx-[5vw] [display:none] max-[600px]:flex flex-col items-center">
    <div class="flex w-full justify-between items-center mt-[15px]">
      <img @click="router.push('/')" src="../assets/place/Chevron_Down.svg" alt="" />
      <div class="flex items-center gap-[9px]">
        <div class="flex items-center">
          <img width="20px" height="20px" class="mt-[-2px]" src="../assets/svg/star.svg" alt="" />
          <p class="text-[12px] font-['Inter']">4.9</p>
        </div>
        <img class="w-[18px] h-[15px]" @click="favourite = true" v-if="!favourite"
          src="../assets/mobileFooter/favourite.svg" alt="" />
        <img class="w-[18px] h-[15px]" @click="favourite = false" v-else src="../assets/svg/FavouriteTrue.svg" alt="" />
        <div class="relative" data-click-outside>
          <img @click="repost = !repost" class="w-[13px] mr-[10px] h-[13px]" src="../assets/svg/upload.svg" alt="" />
          <div v-if="repost"
            class="absolute flex flex-col left-[-200px] top-[20px] z-[50] justify-center w-[220px] bg-white shadow-xl border rounded">
            <div @click="repost = false"
              class="cursor-pointer flex px-[10px] py-[5px] font-['Inter'] hover:bg-zinc-200 rounded-t items-center gap-[5px] text-[16px] mt-[1px]">
              <img class="w-[20px]" src="../assets/svg/url.svg" alt="" />
              <p class="break-normal">Скопировать ссылку</p>
            </div>
            <div @click="repost = false"
              class="cursor-pointer flex px-[10px] py-[5px] font-['Inter'] hover:bg-zinc-200 items-center gap-[5px] text-[16px] mt-[1px]">
              <img class="w-[20px]" src="../assets/svg/vk.svg" alt="" />
              <p class="break-normal">ВКонтакте</p>
            </div>
            <div @click="repost = false"
              class="cursor-pointer flex px-[10px] py-[5px] font-['Inter'] hover:bg-zinc-200 rounded-b items-center gap-[5px] text-[16px] mt-[1px]">
              <img class="w-[17px] mx-[1.5px]" src="../assets/svg/telegram.svg" alt="" />
              <p class="break-normal">Telegram</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2 class="mt-[15px] text-[16px] font-['Inter'] font-[600] mr-auto" id="Name">
      Название этой супер статьи
    </h2>
    <div class="flex items-center mt-[6px] justify-between w-full">
      <div @click="router.push('/404')" class="flex gap-[3px] items-center">
        <img class="w-[20px] h-[20px]" src="../assets/avatar.png" alt="" />
        <p class="text-[12px] font-['Inter'] font-medium leading-[20px] text-[#393C46]">
          Ника Горошек
        </p>
      </div>
      <p class="text-[10px] leading-[16px] font-['Inter'] text-[#3c3c43] opacity-60">
        19.02.2024
      </p>
    </div>
    <img src="../assets/articlePhoto.png" class="w-full max-h-[274px] rounded-[5px] shadow-md mt-[11px]" alt="" />
    <div class="flex mr-auto mt-[10px] items-center gap-[6px] pb-[10px] border-b border-[#00000020] w-full">
      <div @click="scrollToAnchor('Comments')" class="flex items-center gap-[3px]">
        <img src="../assets/svg/Comment.svg" alt="" />
        <p class="font-['Inter'] text-[12px] text-[#848282]">25</p>
      </div>
      <div class="flex items-center gap-[3px]">
        <img src="../assets/svg/eye.svg" alt="" />
        <p class="font-['Inter'] text-[12px] text-[#848282]">1025</p>
      </div>
    </div>
    <div class="mt-[10px]">
      <p class="text-[14px] font-['Inter'] leading-[20px] text-[#292929]">
        Привет, вот это классно что мы проехали по такому маршруту и вот как
        круто супер круто вот и тут и там и здесь и все классно ваще
      </p>
    </div>
    <img src="../assets/articlePhoto.png" class="w-full max-h-[274px] rounded-[5px] shadow-md mt-[11px]" alt="" />
    <span class="text-[12px] font-['Inter'] text-[#292929] opacity-60 mt-[6px]">Описание фоточки</span>
    <h3 class="text-['Inter'] font-medium text-[16px] leading-[32px] mt-[5px] mr-auto">
      Маршрут 2
    </h3>
    <p
      class="font-['Inter'] border-b border-[#00000020] w-full pb-[10px] text-[14px] leading-[20px] text-[#292929] mt-[16px]">
      Тут я еще и видосиков наснимал как клево мы ходили гугляли хуи пинали и
      ваще ахуенчик нагугляли гляньте
    </p>
    <img class="w-full h-[217px] object-cover rounded-[5px] shadow-md" src="../assets/video.png" alt="" />
    <span class="text-[12px] font-['Inter'] pb-[9px] text-[#292929] opacity-60 mt-[6px]">Описание видео</span>
    <div class="flex border-t border-[#00000020] pb-[16px] items-center pt-[10px] w-full justify-between">
      <h3 id="Comments" class="text-['Inter'] font-medium text-[16px] leading-[32px] mt-[5px] mr-auto">
        Комментарии (24)
      </h3>
      <button @click="visible = true"
        class="w-[146px] mt-[5px] h-[26px] bg-[#9FA4EA] text-white font-['Inter'] text-[12px] font-medium rounded-[3px]">
        Написать комментарий
      </button>
    </div>
    <div class="flex flex-col w-[90vw] pt-[16px] pb-[14px] border-t border-[#00000020]">
      <div class="flex items-center gap-[12px]">
        <img src="../assets/avatar.png" class="w-[40px] h-[40px]" alt="" />
        <div class="flex flex-col">
          <p class="font-medium font-['Inter'] leading-[20px] text-[14px]">
            Юлька
          </p>
          <p class="font-['Roboto'] text-[12px] text-[#848282]">19.02.2024</p>
        </div>
      </div>
      <div class="flex flex-col ml-[44px]">
        <p class="font-['Inter'] text-[14px] leading-[20px] mt-[12px] font-[500] max-w-[568px]">
          Че ходили туда хз, в туалете бумаги нет, ка ки дома нихрена нет. Зато
          хотдоги бульдоги зачет, так за соседнем столиком говорили, а мы
          смотрели на них
        </p>
        <div class="flex items-center mt-[13px]">
          <img v-for="index in totalStars" :key="index" :src="index <= rating ? filledStar : emptyStar" alt="star"
            class="w-[16px] h-[16px]" />
        </div>
      </div>
    </div>
    <div class="flex flex-col w-[90vw] pt-[16px] pb-[14px] border-t border-[#00000020]">
      <div class="flex items-center gap-[12px]">
        <img src="../assets/avatar.png" class="w-[40px] h-[40px]" alt="" />
        <div class="flex flex-col">
          <p class="font-medium font-['Inter'] leading-[20px] text-[14px]">
            Юлька
          </p>
          <p class="font-['Roboto'] text-[12px] text-[#848282]">19.02.2024</p>
        </div>
      </div>
      <div class="flex flex-col ml-[44px]">
        <p class="font-['Inter'] text-[14px] leading-[20px] mt-[12px] font-[500] max-w-[568px]">
          Че ходили туда хз, в туалете бумаги нет, ка ки дома нихрена нет. Зато
          хотдоги бульдоги зачет, так за соседнем столиком говорили, а мы
          смотрели на них
        </p>
        <div class="flex items-center mt-[13px]">
          <img v-for="index in totalStars" :key="index" :src="index <= rating ? filledStar : emptyStar" alt="star"
            class="w-[16px] h-[16px]" />
        </div>
      </div>
    </div>
    <button class="w-full h-[33px] mt-[5px] rounded-[6px] font-[700] font-['Roboto'] text-[13px] bg-[#F1F2F3]">
      Загрузить ещё
    </button>
    <div
      class="flex border-t pt-[15px] pb-[15px] mt-[20px] border-[#00000020] w-full items-center justify-between mb-[-15px]">
      <h2 class="text-[32px] font-[550] leading-[42px] ml-[4px] max-[600px]:text-[14px] font-['Roboto']"
        style="letter-spacing: -0.4px">
        Интересные статьи
      </h2>
      <div @click="router.push('/List')"
        class="cursor-pointer flex items-center mr-[0px] text-[#7F85E8] text-[16px] gap-[5px] max-[600px]:text-[9px]"
        href="">
        Смотреть все
        <img class="max-[600px]:w-[10px]" src="../assets/Arrow.png" alt="" />
      </div>
    </div>
    <div class="pt-[5px] pb-[20px] w-max-[90vw] flex w-full max-[600px]:gap-[4vw] gap-[40px]">
      <div @click="router.push('/Article')"
        class="w-[43vw] cursor-pointer overflow-hidden relative overflow-x-hidden max-[600px]:max-w-[43vw] mx-auto h-[310px] max-[600px]:h-[180px] mt-[10px]"
        v-for="item in 2">
        <img
          class="w-[43vw] max-[600px]:h-[107px] max-[600px]:rounded-[10px] object-cover rounded-t-[16px] max-[600px]:max-w-[43vw] h-[173px]"
          src="../assets/Gallery.png" alt="" />
        <p style="line-height: 20px"
          class="absolute top-[10px] max-[600px]:px-[8px] max-[600px]:w-fit h-[12px] max-[600px]:text-[7px] text-[10.4px] text-white font-[300] right-[8px] flex justify-center items-center bg-[#3C3C43] rounded-[4px]">
          Подборки мест
        </p>
        <div
          class="bg-[#F5F5F6] max-[600px]:bg-white max-[600px]:max-w-[43vw] max-[600px]:min-w-[43vw] w-[272px] h-[137px] rounded-b-[16px]">
          <p
            class="text-['Roboto'] overflow-hidden text-[12px] max-h-[84px] text-[#252527] leading-[16px] break-all mt-[6px]">
            Топ-10 настолок для игр с детьми, выбирай не хочу, а если хочешь не
            выбирай. Твое дело
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
