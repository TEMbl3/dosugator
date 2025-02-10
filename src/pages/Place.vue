<script setup>
import { ref } from "vue";
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Gallery from "@/components/Gallery.vue";
import GalleryOpen from "@/components/GalleryOpen.vue";
import CurrentImg from "@/components/CurrentImg.vue";
import Slider from "@/components/Slider.vue";

import filledStar from "@/assets/stars/star.svg";
import emptyStar from "@/assets/stars/empty.svg";
import PopupFeedback from "@/components/PopupFeedback.vue";
import PopupFeedbackPhone from "@/components/PopupFeedbackPhone.vue";

const router = useRouter();
const rating = ref(4);
const hoveredStar = ref(null);
const totalStars = 5;

const setRating = (index) => {
  rating.value = index;
};

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

const onHoverStar = (index) => {
  hoveredStar.value = index;
};

const items2 = ref([
  {
    favourite: false,
  },
  {
    favourite: false,
  },
]);

const repost = ref(false);

const resetHover = () => {
  hoveredStar.value = null;
};

const photos = ref(10);

const mapRef = ref(null);
const mapRefPhone = ref(null);
const searchAddress = "город спорта Делоспорт Москва";

const scrollToAnchor = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

function handleClickOutside(event) {
  // Проверяем, что клик не в элементе с атрибутом data-click-outside
  if (!event.target.closest("[data-click-outside]")) {
    repost.value = false;
  }
}

const favourite = ref(false);

onMounted(() => {
  ymaps.ready(() => {
    const map = new ymaps.Map(mapRef.value, {
      center: [55.76, 37.64],
      zoom: 10,
    });
    const searchControl = new ymaps.control.SearchControl({
      options: {
        noPlacemark: false,
      },
    });

    map.controls.add(searchControl);
    searchControl.search(searchAddress);
  });
});

const places = [{ coords: [59.9342802, 30.3350986], hint: "Центр СПБ" }];

onMounted(() => {
  ymaps.ready(() => {
    const map = new ymaps.Map(mapRefPhone.value, {
      center: [55.76, 37.64], // Координаты центра карты
      zoom: 10, // Масштаб карты
      controls: [], // Отключение элементов управления
    });

    const place = {
      coords: [55.76, 37.64], // Координаты для одной метки
      hint: "This is your place", // Текст подсказки (balloon content)
    };

    // Создание кастомной иконки для метки
    const placemark = new ymaps.Placemark(place.coords, {
      // Настройка кастомной иконки
      iconLayout: "default#image",
      iconImageHref: new URL("../assets/svg/ForestMap.svg", import.meta.url)
        .href, // Путь к вашей иконке
      iconImageSize: [30, 42], // Размер иконки
      iconImageOffset: [-15, -42], // Смещение иконки
    });

    map.geoObjects.add(placemark); // Добавление метки на карту
  });
});

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

const slider = ref(null);

const startDrag = (e) => {
  isDragging = true;
  startX = e.clientX;
  scrollLeft = slider.value.scrollLeft;
  e.preventDefault();
};

const stopDrag = () => {
  isDragging = false;
};

const drag = (e) => {
  if (!isDragging) return;

  const distance = e.clientX - startX;
  slider.value.scrollLeft = scrollLeft - distance;
};

const showPopup = ref(false);
const favouriteHover = ref(false);
const galleryOpen = ref(false);
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

const goToWebsite = () => {
  window.location.replace('https://yandex.com');
};

const NewArrow = ref(0)
const clickNew = ref(() => {
  PoPArrow.value = 0
  if(NewArrow.value < 2){
    NewArrow.value += 1
  } else{
    NewArrow.value = 0
  }
})

const PoPArrow = ref(0)
const clickPoP = ref(() => {
  NewArrow.value = 0 
  if(PoPArrow.value < 2){
    PoPArrow.value += 1
  } else{
    PoPArrow.value = 0
  }
})

const galleryCurrentOpen = ref(false)
</script>

<template>
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
  <Gallery class="" v-if="galleryOpen">
    <img @click="galleryOpen = false" src="../assets/svg/x-close.svg" class="mt-[20px] w-[35px] ml-auto mr-[10px]"
      alt="" />
  </Gallery>
  <GalleryOpen class="" v-if="galleryCurrentOpen">
    <img @click="galleryCurrentOpen = false" src="../assets/svg/x-close.svg"
      class="mt-[20px] w-[35px] ml-auto mr-[10px]" alt="" />
  </GalleryOpen>
  <PopupFeedback v-if="showPopup">
    <img @click="showPopup = false" src="../assets/svg/x-close.svg" alt="" />
  </PopupFeedback>
  <div @click="handleClickOutside" v-if="!galleryOpen && !galleryCurrentOpen"
    class="mx-auto flex flex-col items-center w-[1208px] max-[600px]:[display:none]">
    <div class="flex mt-[10px] items-center gap-[5px] mr-auto w-full relative">
      <img @click="router.push('/')" src="../assets/Home.svg" alt="" />
      <img src="../assets/chevron-right.png" alt="" />
      <p @click="router.push('/List')" class="font-['Mulish'] cursor-pointer text-[14px] leading-[150%] text-[#5B6476]">
        Список мест
      </p>
      <img src="../assets/chevron-right.png" alt="" />
      <p class="font-['Mulish'] text-[14px] leading-[150%] text-[#A2A1F1]">
        Название места
      </p>
    </div>
    <div class="gallery gap-2 mt-[11px]">
      <img @click="galleryCurrentOpen = true" src="../assets/Gallery.png"
        class="object-cover rounded-l-[10px] row-start-1 row-end-3 h-full w-full" />
      <img @click="galleryCurrentOpen = true" src="../assets/Gallery.png" class="object-cover h-full w-full" />
      <img @click="galleryCurrentOpen = true" src="../assets/Gallery.png"
        class="object-cover h-full w-full rounded-tr-[10px]" />
      <img @click="galleryCurrentOpen = true" src="../assets/Gallery.png" class="object-cover h-full w-full" />
      <div class="relative">
        <img @click="galleryCurrentOpen = true" src="../assets/Gallery.png"
          class="object-cover h-full w-full rounded-br-[10px]" />
        <button @click="galleryOpen = true"
          class="font-semibold text-[12px] font-['Inter'] laeding-[24px] w-[124px] py-[2px] absolute top-[159px] left-[calc(50%-62px)] cursor-pointer bg-[#8F94EC] rounded-[5px] text-white">
          Показать все фото
        </button>
      </div>
    </div>
    <div class="flex">
      <div class="flex flex-col mt-[9px] w-[789px] mr-auto">
        <div class="flex justify-between">
          <div class="flex items-center gap-[18px]">
            <div class="flex items-center">
              <img width="20px" height="20px" class="mt-[-2px]" src="../assets/svg/star.svg" alt="" />
              <p>4.9</p>
            </div>
            <div @click="scrollToAnchor('comment')" role="button" class="flex items-center gap-[4px]">
              <img class="mt-[-2px]" src="../assets/svg/Comment.svg" alt="" />
              <p class="text-[#848282]">25</p>
            </div>
            <div class="flex items-center gap-[4.5px]">
              <img class="w-[24px]" src="../assets/svg/eye.svg" alt="" />
              <p class="text-[#848282]">1025</p>
            </div>
          </div>
          <div class="flex items-center gap-[17px]">
            <div @click="favourite = !favourite" @mouseenter="favouriteHover = true"
              @mouseleave="favouriteHover = false" class="flex items-center gap-[4px] cursor-pointer select-none">
              <img v-if="!favourite && !favouriteHover" class="" src="../assets/svg/Vector.svg" alt="" />
              <img class="w-[16px] mr-[1px] mt-[1px]" v-if="favourite || favouriteHover"
                src="../assets/svg/FavouriteTrue.svg" alt="" />
            </div>
            <div data-click-outside class="relative">
              <img @click="repost = !repost" src="../assets/svg/upload.svg" alt="" />
              <div v-if="repost"
                class="absolute flex flex-col left-[-105px] bottom-[30px] justify-center w-[220px] bg-white shadow-md rounded">
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
        <h2 class="font-['Inter'] text-[24px] font-semibold text-black mt-[8px]">
          Название этого супер места
        </h2>
        <div class="flex border-b border-[#D0D0D0] pb-[15px] gap-[10px] items-center">
          <img class="" src="../assets/svg/thumbtack.svg" alt="" />
          <p class="font-['Inter'] text-[18px] text-[#848282]">
            г. Москва ул. новая ордынка 25
          </p>
          <a @click="scrollToAnchor('map')" class="font-['Inter'] cursor-pointer text-[18px] text-[#7F85E8]">Показать на
            карте</a>
        </div>
        <div class="flex-col gap-[18px] flex mt-[19px] pl-[11px] pb-[17px] border-b border-[#D0D0D0]">
          <div class="flex gap-[34px] items-center">
            <img src="../assets/info/Union.svg" alt="" />
            <p>
              <span class="text-[18px] font-['Inter'] leading-[17px] text-black font-semibold">10:00 - 20:00</span>
              <br /><span class="font-['Inter'] text-[14px] leading-[17px] text-[#848282]">Время работы</span>
            </p>
          </div>
          <div class="flex gap-[34px] items-center">
            <img src="../assets/info/wallet.svg" alt="" />
            <p>
              <span class="text-[18px] font-['Inter'] leading-[17px] text-black font-semibold">От 500 ₽</span>
              <br /><span class="font-['Inter'] text-[14px] leading-[17px] text-[#848282]">Стоимость</span>
            </p>
          </div>
          <div class="flex select-none gap-[34px] items-center">
            <img src="../assets/info/globe-wireframe.svg" alt="" />
            <p>
              <span @click="goToWebsite"
                class="text-[18px] font-['Inter'] cursor-pointer leading-[17px] text-black font-semibold">site.ru</span>
              <br /><span class="font-['Inter'] text-[14px] leading-[17px] text-[#848282]">Официальный сайт</span>
            </p>
          </div>
          <div class="flex gap-[34px] items-center">
            <img src="../assets/info/Calling.svg" alt="" />
            <p>
              <span class="text-[18px] font-['Inter'] leading-[17px] text-black font-semibold">8-912-345-67-89</span>
              <br /><span class="font-['Inter'] text-[14px] leading-[17px] text-[#848282]">Телефон</span>
            </p>
          </div>
        </div>
        <h3 class="font-['Inter'] font-medium mt-[10px] mb-[11px] text-[20px] leading-[32px]">
          Описание
        </h3>
        <p class="font-['Inter'] mb-[11px] text-[16px] text-[#505050]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          doloremque facilis ex maxime reprehenderit quasi quidem, labore
          perspiciatis deleniti, quos obcaecati quaerat temporibus. Et
          architecto corrupti consequuntur ipsa autem quas!
        </p>
        <h3 class="font-['Inter'] font-medium mt-[10px] text-[20px] leading-[32px]">
          Где находится
        </h3>
        <div class="rounded-[10px] border ml-[2px] mt-[17px] max-w-[792px] max-h-[333px]" style="overflow: hidden">
          <div id="map" ref="mapRef" class="rounded-[20px]" style="width: 792px; height: 333px"></div>
        </div>
        <div class="flex w-[1208px] gap-[63px] items-end">
          <div class="w-[792px]">
            <div class="flex items-center justify-between mt-[43px]">
              <h2 class="font-['Roboto'] font-medium text-[24px] leading-[48px] text-black" id="comment">
                Комментарии (24)
              </h2>
              <div @click="galleryOpen = true" class="flex cursor-pointer items-center">
                <p class="text-[#7F85E8] font-['Roboto'] leading-[48px] text-[16px]">
                  Смотреть все фото и видео
                </p>
                <img class="ml-[5px] w-[24px]" src="../assets/Arrow.svg" alt="" />
              </div>
            </div>
            <div class="flex overflow-x-hidden mt-[26px] items-center gap-[17px] max-w-[792px] max-h-[100px]"
              ref="slider" @mousedown="startDrag" @mouseup="stopDrag" @mousemove="drag" @mouseleave="stopDrag"
              style="cursor: grab">
              <img @click="CurrentImgOpen = true" v-for="item in photos" class="rounded-[12px] w-[80px] h-[100px]"
                src="../assets/Container.png" alt="" />
            </div>
            <div class="flex items-center mb-[11px] mt-[17px] gap-[15px] ml-[3px]">
              <p class="text-[14px] font-['Inter'] leading-[16px] font-[600]">
                Сортировать по:
              </p>
              <div @click="clickNew" class="flex select-none cursor-pointer items-center">
                <p class="text-[14px] font-['Inter']"
                  :class="{ 'text-[#667085]': NewArrow === 0, 'font-medium': NewArrow !== 0 }">Дате</p>
                <img v-if="NewArrow > 0" :class="{ 'rotate-180': NewArrow === 1, 'rotate-0': NewArrow === 2, }"
                  src="../assets/fi-rs-arrow-up.svg" alt="" />
              </div>
              <div @click="clickPoP" class="flex select-none items-center cursor-pointer">
                <p class="text-[14px] font-['Inter']"
                  :class="{ 'text-[#667085]': PoPArrow === 0, 'font-medium': PoPArrow !== 0 }">Оценке</p>
                <img v-if="PoPArrow > 0" :class="{ 'rotate-180': PoPArrow === 1, 'rotate-0': PoPArrow === 2, }"
                  src="../assets/fi-rs-arrow-up.svg" alt="" />
              </div>
              <label class="relative flex items-center gap-[10px] cursor-pointer">
                <input type="checkbox" class="absolute opacity-0 peer" />
                <span class="custom-checkbox"></span>
                <span style="line-height: 16px" class="text-[14px] font-['Inter'] text-[#667085] font-medium">C
                  фото/видео</span>
              </label>
            </div>
          </div>
          <div
            class="w-[376px] shadow-sm h-[173px] p-[20px] border border-[#EFF0F6] rounded-[10px] flex flex-col justify-center items-center">
            <p class="font-['Inter'] text-[16px] font-[700] text-[#292929] mb-[10px]">
              Рейтинг пользователей
            </p>
            <div class="flex items-center gap-[5px] mb-[10px]">
              <p class="font-bold text-[20px] font-['Inter']">4.95</p>
              <div class="flex items-center">
                <img v-for="index in totalStars" :key="index" :src="index <= (hoveredStar ?? rating) ? filledStar : emptyStar
                  " alt="star" class="w-[16px] h-[16px] cursor-pointer" @mouseover="onHoverStar(index)"
                  @mouseleave="resetHover" @click="setRating(index)" />
              </div>
            </div>
            <button @click="showPopup = true"
              class="bg-[#8F94EC] w-[236px] min-h-[36px] rounded-[8px] font-['Inter'] text-semibold text-[16px] text-white">
              Написать отзыв
            </button>
          </div>
        </div>
        <div class="flex-col flex gap-[14px]">
          <div class="flex flex-col border-t pt-[16px] border-[#D0D0D0]">
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
            <div class="ml-[52px] flex flex-col">
              <p class="font-['Inter'] text-[15px] leading-[20px] mt-[12px] font-[500] max-w-[568px]">
                Че ходили туда хз, в туалете бумаги нет, ка ки дома нихрена нет.
                Зато хотдоги бульдоги зачет, так за соседнем столиком говорили,
                а мы смотрели на них
              </p>
              <div class="flex items-center mt-[13px]">
                <img v-for="index in totalStars" :key="index" :src="index <= rating ? filledStar : emptyStar" alt="star"
                  class="w-[16px] h-[16px]" />
              </div>
              <div class="flex items-center gap-[3px] mt-[13px]">
                <img @click="CurrentImgOpen = true" v-for="item in totalStars" src="../assets/Container.png" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col border-t pt-[16px] border-[#D0D0D0]">
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
            <div class="ml-[52px] flex flex-col">
              <p class="font-['Inter'] text-[15px] leading-[20px] mt-[12px] font-[500] max-w-[568px]">
                Че ходили туда хз, в туалете бумаги нет, ка ки дома нихрена нет.
                Зато хотдоги бульдоги зачет, так за соседнем столиком говорили,
                а мы смотрели на них
              </p>
              <div class="flex items-center mt-[13px]">
                <img v-for="index in totalStars" :key="index" :src="index <= rating ? filledStar : emptyStar" alt="star"
                  class="w-[16px] h-[16px]" />
              </div>
              <div class="flex items-center gap-[3px] mt-[13px]">
                <img @click="CurrentImgOpen = true" v-for="item in totalStars" src="../assets/Container.png" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col border-t pt-[16px] border-[#D0D0D0]">
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
            <div class="ml-[52px] flex flex-col">
              <p class="font-['Inter'] text-[15px] leading-[20px] mt-[12px] font-[500] max-w-[568px]">
                Че ходили туда хз, в туалете бумаги нет, ка ки дома нихрена нет.
                Зато хотдоги бульдоги зачет, так за соседнем столиком говорили,
                а мы смотрели на них
              </p>
              <div class="flex items-center mt-[13px]">
                <img v-for="index in totalStars" :key="index" :src="index <= rating ? filledStar : emptyStar" alt="star"
                  class="w-[16px] h-[16px]" />
              </div>
              <div class="flex items-center gap-[3px] mt-[13px]">
                <img @click="CurrentImgOpen = true" v-for="item in totalStars" src="../assets/Container.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <button
          class="w-full bg-[#F1F2F3] rounded-[6px] text-['Roboto'] font-[600] text-[14px] h-[36px] mt-[19px] mb-[90px]">
          Загрузить ещё
        </button>
      </div>
      <div
        class="w-[376px] shadow-sm ml-[41px] mt-[24px] gap-[20px] h-[668px] border flex flex-col items-center border-[#EFF0F6] rounded-[30px]">
        <p class="font-['Inter'] font-[600] mt-[18px] text-[20px]">
          Вам может понравится
        </p>
        <div class="flex" @click="router.push('/Place')" v-for="item in totalStars">
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
  <div v-if="!galleryOpen && !galleryCurrentOpen" @click="handleClickOutside" style="overflow-x: hidden"
    class="w-[90vw] pb-[100px] mx-[5vw] [display:none] max-[600px]:flex flex-col items-center">
    <div class="flex w-full justify-between items-center mt-[15px]">
      <img @click="router.back()" src="../assets/place/Chevron_Down.svg" alt="" />
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
      Название этого супер места
    </h2>
    <p class="font-['Inter'] text-[13px] font-medium text-[#848282] mr-auto mt-[6px]">
      г. Москва ул. новая ордынка 25
    </p>
    <Slider class="max-h-[274px] mt-[10px] rounded-[5px]" />
    <div class="flex mr-auto mt-[10px] items-center gap-[6px] pb-[10px] border-b border-[#00000020] w-full">
      <div @click="scrollToAnchor('Comment')" class="flex items-center gap-[3px]">
        <img src="../assets/svg/Comment.svg" alt="" />
        <p class="font-['Inter'] text-[12px] text-[#848282]">25</p>
      </div>
      <div class="flex items-center gap-[3px]">
        <img src="../assets/svg/eye.svg" alt="" />
        <p class="font-['Inter'] text-[12px] text-[#848282]">1025</p>
      </div>
    </div>
    <div class="items-center gap-[20px] w-[90vw] justify-start flex mt-[10px]">
      <div class="flex flex-col items-center text-center">
        <span class="font-['Inter'] text-[11px] leading-[17px] text-[#848282]">Время работы</span>
        <p>
          <span class="text-[12px] font-['Roboto'] leading-[17px] text-black font-semibold">10:00 - 20:00</span>
        </p>
      </div>
      <div class="flex flex-col items-center text-center">
        <span class="font-['Inter'] text-[11px] leading-[17px] text-[#848282]">Стоимость</span>
        <p>
          <span class="text-[12px] font-['Roboto'] leading-[17px] text-black font-semibold">От 500₽</span>
        </p>
      </div>
      <div class="flex flex-col items-center text-center">
        <span class="font-['Inter'] text-[11px] leading-[17px] text-[#848282]">Сайт</span>
        <p @click="goToWebsite">
          <span class="text-[12px] font-['Roboto'] leading-[17px] text-black font-semibold">site.ru</span>
        </p>
      </div>
      <div class="flex flex-col items-center text-center">
        <span class="font-['Inter'] text-[11px] leading-[17px] text-[#848282]">Телефон</span>
        <a href="tel:84951234567">
          <span class="text-[12px] font-['Roboto'] leading-[17px] text-black font-semibold">+7 (495) 123-45-67</span>
        </a>
      </div>
    </div>
    <h3 class="text-['Inter'] font-medium text-[16px] leading-[32px] mt-[5px] mr-auto">
      Описание
    </h3>
    <p class="font-['Inter'] border-b border-[#00000020] w-full pb-[10px] text-[14px] text-[#848282] mt-[8px]">
      Привет это чудо место вапваыпваыпвапвапва вапвапывпвыапавп
      <br />
      Тут можно петь и танцевать
      <br />
      Классные люди
      <br />
      Можно описаться от счастья
    </p>
    <h3 class="text-['Inter'] font-medium text-[16px] leading-[32px] mt-[5px] mr-auto">
      Где находится
    </h3>
    <div class="pb-[20px] border-b border-[#00000020]">
      <div class="rounded-[10px] border ml-[2px] mt-[17px] relative max-w-[90vw] max-h-[310px]"
        style="overflow: hidden">
        <div
          class="absolute z-10 shadow bg-white text-[14px] font-['Inter'] text-[#848282] px-[11px] py-[7px] rounded-[10px] left-[5px] top-[8px]">
          г. Москва ул. новая ордынка 25
        </div>
        <div id="map" ref="mapRefPhone" class="rounded-[20px]" style="width: 792px; height: 310px"></div>
      </div>
    </div>
    <div class="flex items-center mt-[5px] w-full justify-between">
      <h3 id="Comment" class="text-['Inter'] font-medium text-[16px] leading-[32px] mt-[5px] mr-auto">
        Отзывы (24)
      </h3>
      <button @click="visible = true"
        class="w-[146px] mt-[5px] h-[26px] bg-[#9FA4EA] text-white font-['Inter'] text-[12px] font-medium rounded-[3px]">
        Написать отзыв
      </button>
    </div>
    <div class="flex overflow-x-auto mt-[11px] items-center gap-[3px] max-h-[62px]" style="cursor: grab">
      <img @click="CurrentImgOpen = true" v-for="item in photos" class="rounded-[12px] w-[50px] h-[62px]"
        src="../assets/Container.png" alt="" />
    </div>
    <div class="flex pb-[10px] items-center mb-[11px] mt-[14px] gap-[9px]">
      <p class="text-[12px] font-['Inter'] leading-[16px] font-[600]">
        Сортировать по:
      </p>
      <div @click="clickNew" class="flex select-none cursor-pointer items-center">
                <p class="text-[12px] font-['Inter']"
                  :class="{ 'text-[#667085]': NewArrow === 0, 'font-medium': NewArrow !== 0 }">Дате</p>
                <img v-if="NewArrow > 0" :class="{ 'rotate-180': NewArrow === 1, 'rotate-0': NewArrow === 2, }"
                  src="../assets/fi-rs-arrow-up.svg" alt="" />
              </div>
              <div @click="clickPoP" class="flex select-none items-center cursor-pointer">
                <p class="text-[12px] font-['Inter']"
                  :class="{ 'text-[#667085]': PoPArrow === 0, 'font-medium': PoPArrow !== 0 }">Оценке</p>
                <img v-if="PoPArrow > 0" :class="{ 'rotate-180': PoPArrow === 1, 'rotate-0': PoPArrow === 2, }"
                  src="../assets/fi-rs-arrow-up.svg" alt="" />
              </div>
      <label class="relative flex items-center gap-[10px] cursor-pointer">
        <input type="checkbox" class="absolute opacity-0 peer" />
        <span class="custom-checkbox"></span>
        <span style="line-height: 16px" class="text-[12px] font-['Inter'] text-[#667085] font-medium">C
          фото/видео</span>
      </label>
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
        <div class="flex overflow-x-auto items-center gap-[3px] w-[95vw] mt-[7px] max-h-[62px]" style="cursor: grab">
          <img @click="CurrentImgOpen = true" v-for="item in 3" class="rounded-[12px] w-[50px] h-[62px]"
            src="../assets/Container.png" alt="" />
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
        <div class="flex overflow-x-auto items-center gap-[3px] w-[95vw] mt-[7px] max-h-[62px]" style="cursor: grab">
          <img @click="CurrentImgOpen = true" v-for="item in 5" class="rounded-[12px] w-[50px] h-[62px]"
            src="../assets/Container.png" alt="" />
        </div>
      </div>
    </div>
    <a v-show="showScrollButton" @click="scrollToTop" style="box-shadow: 0 0 7px #8f92b2"
      class="fixed bottom-[120px] right-[20px] ml-auto mr-[5px] z-10 bg-white flex items-center justify-center w-[26px] h-[26px] border rounded-[50%]"><img
        class="rotate-90" src="../assets/place/Chevron_Down.svg" alt="" /></a>
    <button class="w-full h-[33px] mt-[5px] rounded-[6px] font-[700] font-['Roboto'] text-[13px] bg-[#F1F2F3]">
      Загрузить ещё
    </button>
    <div class="flex border-t pt-[10px] mt-[20px] border-[#00000020] w-full items-center justify-between mb-[-15px]">
      <h2 class="text-[32px] font-[550] leading-[42px] ml-[4px] max-[600px]:text-[14px] font-['Roboto']"
        style="letter-spacing: -0.4px">
        Вам может понравится
      </h2>
      <div @click="router.push('/List')"
        class="cursor-pointer flex items-center mr-[0px] text-[#7F85E8] text-[16px] gap-[5px] max-[600px]:text-[9px]"
        href="">
        Смотреть все
        <img class="max-[600px]:w-[10px]" src="../assets/Arrow.svg" alt="" />
      </div>
    </div>
    <div @click="router.push('/Place')"
      class="pt-[5px] pb-[20px] flex w-full max-[600px]:gap-[15px] pl-[-10px] gap-[40px]">
      <div
        class="w-[273px] mx-auto cursor-pointer relative max-[600px]:max-w-[42vw] h-[310px] max-[600px]:h-[180px] mt-[10px] max-[600px]:"
        v-for="item in items2">
        <img
          class="w-[272px] max-[600px]:h-[107px] max-[600px]:rounded-[10px] object-cover rounded-t-[16px] max-[600px]:max-w-[42vw] h-[173px]"
          src="../assets/Gallery.png" alt="" />
        <p style="line-height: 20px"
          class="absolute top-[10px] max-[600px]:w-[69px] max-[600px]:h-[12px] max-[600px]:text-[7px] text-[10.4px] text-white font-[300] right-[8px] flex justify-center items-center bg-[#7F84D0] w-[107px] h-[28px] rounded-[4px]">
          Детские площадки
        </p>
        <div
          class="bg-[#F5F5F6] max-[600px]:bg-white max-[600px]:max-w-[45vw] max-[600px]:min-w-[45vw] w-[272px] h-[137px] rounded-b-[16px]">
          <h3
            class="text-[22px] pt-[4px] ml-[16px] max-[600px]:ml-0 max-[600px]:text-[13px] max-[600px]:font-[600] font-medium font-['Roboto']">
            Парк Лукоморье
          </h3>
          <div class="flex items-center mt-[-2px]">
            <img class="ml-[16px] mt-[7px] max-[600px]:w-[16px] max-[600px]:ml-0" src="../assets/metro.svg" alt="" />
            <p class="text-[16px] max-[600px]:text-[10px] max-[600px]:mt-[6.5px] mt-[9px] ml-[3px] text-[#848282] font-['Roboto']"
              style="letter-spacing: 0.1px">
              Менделеевская
            </p>
          </div>
          <p class="text-[16px] max-[600px]:ml-[0px] max-[600px]:mt-[2px] max-[600px]:text-[10px] ml-[16px] text-[#848282] font-['Roboto']"
            style="letter-spacing: 0.1px">
            Москва, д. Николо-Хованское
          </p>
          <div class="flex mt-[7px] gap-[12px] max-[600px]:ml-[0px] ml-[16px] items-center">
            <div class="flex items-center">
              <img class="mt-[-2px] max-[600px]:w-[12px]" src="../assets/svg/Star.svg" alt="" />
              <p class="max-[600px]:text-[9px]">4.9</p>
            </div>
            <div class="flex items-center gap-[4px]">
              <img class="mt-[-2px] max-[600px]:w-[10px]" src="../assets/svg/Comment.svg" alt="" />
              <p class="text-[#848282] max-[600px]:text-[9px]">25</p>
            </div>
            <div class="flex ml-[-1px] items-center gap-[4.5px]">
              <img class="mt-[-2px] max-[600px]:w-[15px]" src="../assets/svg/eye.svg" alt="" />
              <p class="text-[#848282] max-[600px]:text-[9px]">1025</p>
            </div>
            <img class="ml-auto mr-[16px] max-[600px]:w-[12px] mb-[2px] max-[600px]:mr-[10px]"
              @click.stop="item.favourite = true" v-if="!item.favourite" src="../assets/mobileFooter/favourite.svg"
              alt="" />
            <img class="ml-auto mr-[16px] max-[600px]:w-[8px] mb-[3px] max-[600px]:mr-[12px]"
              @click.stop="item.favourite = false" v-else src="../assets/svg/FavouriteTrue.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap");

.gallery {
  display: grid;
  grid-template-columns: 572.5px 310px 310px;
  grid-template-rows: 195px 195px;
}
</style>
