<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Popup from "../components/PopupArticle.vue";
const router = useRouter();

const items = ref([
  {
    label: "Подборки мест",
    checked: false,
  },
  {
    label: "Обзоры, статьи",
    checked: false,
  },
  {
    label: "Игры",
    checked: false,
  },
  {
    label: "Книги",
    checked: false,
  },
  {
    label: "Лайфхаки",
    checked: false,
  },
]);

function handleClickOutside(event) {
  // Проверяем, что клик не в элементе с атрибутом data-click-outside
  if (!event.target.closest("[data-click-outside]")) {
    open.value = "";
  }
}

const showPopup = ref(false);

const open = ref("");
const openOpt = ref((e) => {
  if (open.value === e) {
    return (open.value = "");
  }
  open.value = e;
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const clear = ref(() => {
  items.value.forEach((e) => {
    e.checked = false;
  });
});

const openCat = ref((cat) => {
  if (cat === "Подборки мест") {
    items.value.forEach((e) => {
      e.checked = false;
    });
    items.value[0].checked = true;
  }
  if (cat === "Лайфхаки") {
    items.value.forEach((e) => {
      e.checked = false;
    });
    items.value[4].checked = true;
  }
});

const list = ref([
  {
    name: "Куда сходить в Калужской области, ага пойдемте дети...",
    type: "Подборки мест",
    date: "19.02.2024",
    favourite: false,
    favouriteHover: false,
  },
  {
    name: "Коломна для детей(мастер-классы)",
    type: "Подборки мест",
    date: "19.02.2024",
    favourite: false,
    favouriteHover: false,
  },
  {
    name: "Настолки для игр с детьми и для всей семьи",
    type: "Лайфхаки",
    date: "19.02.2024",
    favourite: false,
    favouriteHover: false,
  },
  {
    name: "Куда сходить в Калужской области, ага пойдемте дети...",
    type: "Подборки мест",
    date: "19.02.2024",
    favourite: false,
    favouriteHover: false,
  },
  {
    name: "Коломна для детей(мастер-классы)",
    type: "Подборки мест",
    date: "19.02.2024",
    favourite: false,
    favouriteHover: false,
  },
  {
    name: "Настолки для игр с детьми и для всей семьи",
    type: "Лайфхаки",
    date: "19.02.2024",
    favourite: false,
    favouriteHover: false,
  },
  {
    name: "Куда сходить в Калужской области, ага пойдемте дети...",
    type: "Подборки мест",
    date: "19.02.2024",
    favourite: false,
    favouriteHover: false,
  },
  {
    name: "Коломна для детей(мастер-классы)",
    type: "Подборки мест",
    date: "19.02.2024",
    favourite: false,
    favouriteHover: false,
  },
  {
    name: "Настолки для игр с детьми и для всей семьи",
    type: "Лайфхаки",
    date: "19.02.2024",
    favourite: false,
    favouriteHover: false,
  },
]);

const showScrollButton = ref(false);
const scrollThreshold = 1 * window.innerHeight;

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

const NewArrow = ref(0)
const clickNew = ref(() => {
  PoPArrow.value = 0
  if (NewArrow.value < 2) {
    NewArrow.value += 1
  } else {
    NewArrow.value = 0
  }
})

const PoPArrow = ref(0)
const clickPoP = ref(() => {
  NewArrow.value = 0
  if (PoPArrow.value < 2) {
    PoPArrow.value += 1
  } else {
    PoPArrow.value = 0
  }
})
</script>

<template>
  <a v-show="showScrollButton" @click="scrollToTop" style="box-shadow: 0 0 7px #8f92b2"
    class="fixed bottom-[120px] right-[20px] ml-auto mr-[5px] z-50 bg-white flex items-center justify-center w-[26px] h-[26px] border rounded-[50%]"><img
      class="rotate-90" src="../assets/place/Chevron_Down.svg" alt="" /></a>
  <Popup v-if="showPopup"><img @click="showPopup = false" src="../assets/svg/x-close.svg" alt="" /></Popup>
  <div class="mx-auto max-[600px]:overflow-x-hidden flex pl-[5px] flex-col items-center w-[1208px]">
    <div class="max-[600px]:[display:none] flex mt-[10px] items-center gap-[5px] mr-auto w-full relative">
      <img class="cursor-pointer" @click="router.push('/')" src="../assets/Home.svg" alt="" />
      <img src="../assets/chevron-right.png" alt="" />
      <p class="font-['Mulish'] text-[14px] leading-[150%] text-[#5B6476]">
        Список статей
      </p>
    </div>
    <h2 class="text-[32px] max-[600px]:[display:none] font-medium font-['Roboto'] leading-[48px] mr-auto mt-[12px]">
      Заголовок, что это список крутецких статей и подборок
    </h2>
    <div class="flex gap-[40px]">
      <div class="w-[272px] max-[600px]:[display:none] mr-auto mt-[8px]">
        <div class="flex mt-[2px] items-center justify-between">
          <p class="text-[#4B4B4B] text-[20px] mt-[1px] font-semibold" style="line-height: 20px">
            Фильтры
          </p>
          <a @click="clear(), console.log('asdad')"
            class="text-[#8F94EC] cursor-pointer select-none text-[14px] font-['Inter'] mr-[8px] font-medium"
            style="line-height: 20px">Сбросить все</a>
        </div>
        <div class="w-[246px] mt-[22px] ml-[2px] h-[300px]">
          <p class="text-[14px] font-semibold text-[#98A0B4] mb-[18px] font-['Inter']" style="line-height: 17px">
            Категории
          </p>
          <div class="flex-col flex gap-[15px]">
            <div v-for="item in items" :key="item.id" class="flex select-none">
              <!-- Скрываем стандартный чекбокс и используем кастомный -->
              <label class="relative flex items-center gap-[10px] cursor-pointer">
                <input type="checkbox" v-model="item.checked" class="absolute opacity-0 peer" />
                <span class="custom-checkbox"></span>
                <span style="line-height: 16px"
                  class="text-[#4B4B4B] text-[14px] font-medium font-['Inter'] cursor-pointer">{{ item.label }}</span>
              </label>
            </div>
          </div>
        </div>
        <div
          class="flex rounded-[10px] pt-[5px] flex-col items-center mb-[20px] border border-[#EFF0F6] shadow-sm mt-[107px] w-[267px] h-[209px]">
          <h3 class="font-['DM Sans'] text-[#170F49] leading-[46px] text-[16px] font-bold">
            Есть чем поделиться?
          </h3>
          <p class="font-['DM Sans'] leading-[18px] text-[13px] text-[#6F6C90] text-center px-[17px]">
            Добавьте свою статью с интересными местами, лайфхаками и т.д.
          </p>
          <img src="../assets/svg/Plus.svg" class="mt-[6px]" alt="" />
          <button @click="(showPopup = true), scrollToTop()"
            class="bg-[#8F94EC] rounded-[8px] mt-[6px] w-[236px] h-[36px] font-['Inter'] text-semibold text-[16px] leading-[24px] text-white">
            Добавить статью
          </button>
        </div>
      </div>
      <div class="w-[896px] max-[600px]:hidden flex flex-col">
        <div class="flex items-center mt-[10px] ml-auto gap-[9px]">
          <p class="text-[14px] font-['Roboto']">Сортировать по:</p>
          <div @click="clickNew" class="flex select-none cursor-pointer items-center">
            <p class="text-[14px] font-['Roboto']"
              :class="{ 'text-[#667085]': NewArrow === 0, 'font-medium': NewArrow !== 0 }">Новые</p>
            <img v-if="NewArrow > 0" :class="{ 'rotate-180': NewArrow === 1, 'rotate-0': NewArrow === 2, }"
              src="../assets/fi-rs-arrow-up.svg" alt="" />
          </div>
          <div @click="clickPoP" class="flex select-none items-center cursor-pointer">
            <p class="text-[14px] font-['Roboto']"
              :class="{ 'text-[#667085]': PoPArrow === 0, 'font-medium': PoPArrow !== 0 }">Популярные</p>
            <img v-if="PoPArrow > 0" :class="{ 'rotate-180': PoPArrow === 1, 'rotate-0': PoPArrow === 2, }"
              src="../assets/fi-rs-arrow-up.svg" alt="" />
          </div>
        </div>
        <div class="flex items-center flex-wrap gap-[40px] mt-[26px] w-max-[896px]">
          <div @click="router.push('/Article')" class="w-[272px] cursor-pointer h-[310px]" :key="index"
            v-for="(item, index) in list">
            <div class="relative">
              <img src="../assets/Gallery.png" class="w-[272px] h-[209px] object-cover rounded-t-[16px]" alt="" />
              <div @click.stop="openCat(item.type)" :class="{
                'bg-[#FE6264]': item.type === 'Подборки мест',
                'bg-[#69A278]': item.type === 'Лайфхаки',
              }"
                class="top-[165px] border-none select-none left-[16px] absolute py-[4px] px-[8px] rounded-[4px]">
                <p class="text-[10px] text-[#F2F7FB] font-['Rubik'] leading-[20px]">
                  {{ item.type }}
                </p>
              </div>
            </div>
            <div class="w-[272px] relative h-[109px] bg-[#F5F5F6] rounded-b-[16px] px-[16px]">
              <h3 class="text-['Rubik'] leading-[20px] text-[18px] font-[600] pt-[5.5px] text-[#252527]">
                {{ item.name }}
              </h3>
              <div class="flex items-center mt-auto w-[240px] bottom-[14px] absolute justify-between">
                <p class="pt-[6px] text-[#848282] text-[14px] font-['Inter']">
                  {{ item.date }}
                </p>
                <div @click.stop="item.favourite = !item.favourite" @mouseenter="item.favouriteHover = true"
                  @mouseleave="item.favouriteHover = false"
                  class="flex items-center gap-[4px] cursor-pointer select-none">
                  <img v-if="!item.favourite && !item.favouriteHover" class="" src="../assets/svg/Vector.svg" alt="" />
                  <img class="w-[16px] mr-[1px] mt-[1px]" v-if="item.favourite || item.favouriteHover"
                    src="../assets/svg/FavouriteTrue.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          class="mt-[32px] mb-[30px] text-center w-[896px] h-[37px] bg-[#F1F2F3] rounded-[6px] font-[700] font-['Inter'] text-[14px]">
          Показать ещё
        </button>
      </div>
    </div>
  </div>
  <div @click="handleClickOutside" class="hidden max-[600px]:flex pb-[100px] flex-col mx-auto w-[90vw]">
    <div class="hidden mt-[13px] mx-auto items-center gap-[10px] max-[600px]:flex">
      <img @click="router.back()" class="w-[20px] h-[20px]" src="../assets/list/Chevron_Down.svg" alt="" />
      <div class="relative">
        <div data-click-outside @click="openOpt('cat')" :class="{ 'bg-[#F2F2F2]': open === 'cat' }"
          class="flex min-w-[95px] items-center gap-[2px] pl-[8px] pr-[7px] h-[28px] font-['Inter'] text-[14px] text-[#3A3A49] shadow rounded-[5px]">
          Категории
          <img class="rotate-[270deg]" src="../assets/list/Chevron_Down.svg" alt="" />
        </div>
        <div data-click-outside v-if="open === 'cat'"
          class="absolute px-[10px] py-[10px] bg-white border border-[#e4e5e6] rounded-[5px] z-10 top-[29px] left-[0px]">
          <div class="flex-col flex gap-[15px]">
            <div v-for="item in items" :key="item.id" class="flex select-none">
              <!-- Скрываем стандартный чекбокс и используем кастомный -->
              <label class="relative flex items-center gap-[10px] cursor-pointer">
                <input type="checkbox" v-model="item.checked" class="absolute opacity-0 peer" />
                <span class="custom-checkbox"></span>
                <span style="line-height: 16px"
                  class="text-[#4B4B4B] text-[14px] text-nowrap font-medium font-['Inter'] cursor-pointer">{{ item.label
                  }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <button @click="showPopup = true"
        class="text-white bg-[#9FA4EA] z-[10] w-[204px] h-[28px] flex items-center justify-center text-[14px] font-['Inter'] font-medium gap-[5px] rounded-[5px]">
        <img src="../assets/svg/PlusWhite.svg" alt="" />Добавить статью
      </button>
    </div>
    <div class="flex items-center mt-[30px] gap-[9px] mr-auto">
      <p class="text-[12px] font-['Roboto']">Сортировать по:</p>
      <div @click="clickNew" class="flex select-none cursor-pointer items-center">
        <p class="text-[12px] font-['Roboto']"
          :class="{ 'text-[#667085]': NewArrow === 0, 'font-medium': NewArrow !== 0 }">Новые</p>
        <img v-if="NewArrow > 0" :class="{ 'rotate-180': NewArrow === 1, 'rotate-0': NewArrow === 2, }"
          src="../assets/fi-rs-arrow-up.svg" alt="" />
      </div>
      <div @click="clickPoP" class="flex select-none items-center cursor-pointer">
        <p class="text-[12px] font-['Roboto']"
          :class="{ 'text-[#667085]': PoPArrow === 0, 'font-medium': PoPArrow !== 0 }">Популярные</p>
        <img v-if="PoPArrow > 0" :class="{ 'rotate-180': PoPArrow === 1, 'rotate-0': PoPArrow === 2, }"
          src="../assets/fi-rs-arrow-up.svg" alt="" />
      </div>
    </div>
    <div class="flex flex-col gap-[15px]">
      <div v-for="item in items" @click="router.push('/Article')"
        class="flex overflow-hidden flex-col mt-[10px] gap-[6px]">
        <div class="relative overflow-hidden">
          <div @click.stop="clear(), (items[0].checked = true)"
            class="text-[12px] overflow-hidden py-[5px] px-[8px] right-[5px] top-[9px] font-['Inter'] text-white bg-[#3C3C43] rounded-[5px] absolute">
            Подборки мест
          </div>
          <img class="w-full rounded-[10px]" src="../assets/Gallery.png" alt="" />
        </div>
        <p class="text-[14px] leading-[16px] text-[#252527] text-['Roboto']">
          Куда сходить в Калужской области с детьми и еще можно вообще никуда не
          ходить, а просто просидеть дома...
        </p>
        <div class="flex justify-between items-center w-full">
          <span class="text-[12px] text-[#848282] font-['Inter']">19.02.2024</span>
          <div @click.stop="item.favourite = !item.favourite" class="cursor-pointer">
            <img v-if="!item.favourite && !item.favouriteHover" class="w-[12px] h-[16px]" src="../assets/svg/Vector.svg"
              alt="" />
            <img class="w-[12px] h-[16px]" v-if="item.favourite || item.favouriteHover"
              src="../assets/svg/FavouriteTrue.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <button
      class="w-full h-[33px] text-black font-semibold text-[12px] font-['Inter'] bg-[#F1F2F3] mt-[9px] rounded-[6px]">
      Показать ещё
    </button>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");
</style>
