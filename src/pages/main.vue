<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Slider from "@/components/Slider.vue";
import clusterIcon from '../assets/cluster.svg';
const router = useRouter();

const items = ref([
  { favourite: false },
  { favourite: false },
  { favourite: false },
  { favourite: false },
]);

const items2 = ref([
  { name: "Список водных детских площадок с песком в Москве" },
  { name: "Где покормить животных в Москве и области" },
  { name: "25 интересных мест куда поехать на выходных в подмосковье" },
  { name: "Список бассейнов под открытым небом в Москве" },
  { name: "Куда пойти с ребенком до 3-х лет в Москве и области" },
  { name: "Где покормить животных в Москве и области" },
  { name: "25 интересных мест куда поехать на выходных в подмосковье" },
  { name: "Список бассейнов под открытым небом в Москве" },
]);

import { onMounted } from "vue";


const favourite = ref(false);
const favouriteHover = ref(false);
const mapRef = ref(null);
const points = [
  {
    id: 1,
    coordinates: [55.751574, 37.573856],
    icon: new URL("../assets/svg/ForestMap.svg", import.meta.url).href,
    info: {
      title: "Точка 1",
      description: "Описание точки 1",
      image: new URL("../assets/svg/ForestMap.svg", import.meta.url).href,
    },
  },
  {
    id: 2,
    coordinates: [55.691574, 37.673856],
    icon: new URL("../assets/svg/ForestMap.svg", import.meta.url).href,
    info: {
      title: "Точка 2",
      description: "Описание точки 2",
      image: new URL("../assets/svg/ForestMap.svg", import.meta.url).href,
    },
  },
  {
    id: 3,
    coordinates: [55.791574, 37.873856],
    icon: new URL("../assets/svg/ForestMap.svg", import.meta.url).href,
    info: {
      title: "Точка 3",
      description: "Описание точки 3",
      image: new URL("../assets/svg/ForestMap.svg", import.meta.url).href,
    },
  },
];
const selectedPoint = ref(null);
onMounted(() => {
  ymaps.ready(() => {
    const map = new ymaps.Map(mapRef.value, {
      center: [55.76, 37.64],
      zoom: 10,
    });

    const objectManager = new ymaps.ObjectManager({
      clusterize: true,
      gridSize: 96,
      clusterDisableClickZoom: false,
    });

    objectManager.clusters.options.set({
      clusterIcons: [
        {
          href: clusterIcon,
          size: [50, 62],
          offset: [-25, -31],
        },
      ],
      clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(
        `<div style="display: flex; justify-content: center; align-items: center; color: #fff; font-size: 18px; font-weight: bold; width: 50px; height: 70px;">
          <img src="${clusterIcon}" style="width: 100%; height: 100%; object-fit: cover;" alt="Cluster Icon" />
          <div style="position: absolute; color: #fff; font-size: 22px; margin-bottom: 10px; font-weight: bold;">
            {{ properties.geoObjects.length }}
          </div>
        </div>`
      ),
    });

    const data = {
      type: "FeatureCollection",
      features: points.map((point) => ({
        type: "Feature",
        id: point.id,
        geometry: {
          type: "Point",
          coordinates: point.coordinates,
        },
        properties: {},
        options: {
          iconLayout: "default#image",
          iconImageHref: point.icon,
          iconImageSize: [47, 67.45],
          iconImageOffset: [-20, -20],
        },
      })),
    };

    objectManager.add(data);

    objectManager.objects.events.add("click", (e) => {
      const objectId = e.get("objectId");
      const clickedPoint = points.find((point) => point.id === objectId);
      if (clickedPoint) {
        map.setCenter(clickedPoint.coordinates);
      }
      selectedPoint.value = clickedPoint.info;
    });

    map.geoObjects.add(objectManager);

    map.events.add("click", () => {
      open.value = "";
      selectedPoint.value = null;
    });

    map.events.add("boundschange", (event) => {
      if (event.get("newZoom") || event.get("newCenter")) {
        selectedPoint.value = null;
      }
    });
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
</script>

<template>
  <div class="mx-auto flex flex-col items-center w-[1208px] max-[600px]:w-[92.5vw]">
    <h2 class="mr-auto text-[32px] font-[600] max-[600px]:[display:none]">
      Давай найдем куда тебе поехать
    </h2>
    <h2 class="max-[600px]:block [display:none] text-[14px] mr-auto leading-[48px] font-[600] text-['Roboto']">
      Выбери куда
    </h2>
    <div
      class="grid grid-rows-3 mb-[47px] max-[600px]:mb-[30px] grid-cols-3 gap-x-[40px] mt-[25px] w-full max-[600px]:mt-0 gap-y-[25px] max-[600px]:gap-[8px]">
      <div @click="router.push('/List/All')" style="
          background: rgb(149, 212, 250);
          background: linear-gradient(
            42deg,
            rgba(149, 212, 250, 1) 0%,
            rgba(179, 178, 249, 1) 57%,
            rgba(181, 158, 255, 1) 100%
          );
        "
        class="w-[376px] relative overflow-hidden transition h-[172px] flex justify-between bg-[#F2F2F2] rounded-[25px] cursor-pointer select-none max-[600px]:w-full max-[600px]:max-h-[70px] max-[600px]:min-h-[70px] max-[600px]:rounded-[10px]">
        <p class="text-[16px] z-30 max-[600px]:mt-[4px] max-[600px]:ml-[4px] mt-[14px] ml-[9px] font-[550] font-['Roboto'] text-black max-[600px]:text-[12px]"
          style="letter-spacing: 0.05px">
          Все категории
        </p>
        <img
          class="max-[600px]:absolute max-[600px]:w-[80px] max-[600px]:h-[80px] max-[600px]:right-[-5px] max-[600px]:top-[-6px] max-[600px]:mt-[10px] object-cover pb-[10px] w-[193px] h-[185px] mt-auto"
          style="border-radius: 0 0 0px 0" src="../assets/categories/001.png" alt="" />
      </div>
      <div @click="router.push('/List/Playgrounds')"
        class="w-[376px] overflow-hidden relative transition hover:bg-[#e7e7e7] h-[172px] flex justify-between bg-[#F2F2F2] rounded-[25px] cursor-pointer select-none max-[600px]:w-[100%] max-[600px]:max-h-[70px] max-[600px]:min-h-[70px] max-[600px]:rounded-[10px]">
        <p class="max-[600px]:mt-[4px] z-30 max-[600px]:ml-[4px] text-[16px] mt-[14px] ml-[9px] font-[550] font-['Roboto'] text-black max-[600px]:text-[12px]"
          style="letter-spacing: 0.05px">
          Детские площадки
        </p>
        <img
          class="max-w-[163px] max-[600px]:absolute max-h-[151px] max-[600px]:top-[-3px] mt-auto max-[600px]:w-[60px] max-[600px]:h-[55px] max-[600px]:right-[3px] max-[600px]:mt-[20px]"
          style="border-radius: 0 0 0px 0" src="../assets/categories/002.png" alt="" />
      </div>
      <div @click="router.push('/List/Zoo')"
        class="w-[376px] overflow-hidden relative h-[172px] transition hover:bg-[#e7e7e7] flex justify-between bg-[#F2F2F2] rounded-[25px] cursor-pointer select-none max-[600px]:w-full max-[600px]:max-h-[70px] max-[600px]:min-h-[70px] max-[600px]:rounded-[10px]">
        <p class="max-[600px]:mt-[4px] z-30 max-[600px]:ml-[4px] text-[16px] mt-[14px] ml-[10px] font-[550] font-['Roboto'] text-black max-[600px]:text-[12px]"
          style="letter-spacing: 0.05px">
          Зоопарки <br>Фермы
        </p>
        <img
          class="max-w-[164px] max-[600px]:w-[55px] max-[600px]:absolute max-h-[173px] max-[600px]:top-[-4px] object-cover mt-auto max-[600px]:right-[1px] max-[600px]:mt-[20px]"
          style="border-radius: 0 0 0px 0" src="../assets/categories/003.png" alt="" />
      </div>
      <div @click="router.push('/List/GamingCentersAndAttractions')"
        class="w-[376px] overflow-hidden relative h-[172px] transition hover:bg-[#e7e7e7] flex justify-between bg-[#F2F2F2] rounded-[25px] cursor-pointer select-none max-[600px]:w-full max-[600px]:max-h-[70px] max-[600px]:min-h-[70px] max-[600px]:rounded-[10px]">
        <p class="max-[600px]:mt-[4px] z-30 max-[600px]:ml-[4px] text-[16px] absolute mt-[14px] ml-[10px] font-[550] font-['Roboto'] text-black max-[600px]:text-[12px]"
          style="letter-spacing: 0.05px">
          Игровые центры/Аттракционы
        </p>
        <img
          class="max-w-[159px] ml-auto max-[600px]:absolute max-h-[158px] mt-auto max-[600px]:w-[44px] max-[600px]:h-[45px] max-[600px]:right-[0px] max-[600px]:mt-[25px]"
          style="border-radius: 0 0 0px 0" src="../assets/categories/004.png" alt="" />
      </div>
      <div @click="router.push('/List/Educational')"
        class="w-[376px] overflow-hidden relative h-[172px] transition hover:bg-[#e7e7e7] flex justify-between bg-[#F2F2F2] rounded-[25px] cursor-pointer select-none max-[600px]:w-full max-[600px]:max-h-[70px] max-[600px]:min-h-[70px] max-[600px]:rounded-[10px]">
        <p class="max-[600px]:mt-[4px] z-30 max-[600px]:ml-[4px] text-[16px] mt-[14px] ml-[10px] font-[550] font-['Roboto'] text-black max-[600px]:text-[12px]"
          style="letter-spacing: 0.05px">
          Познавательное
        </p>
        <img
          class="max-w-[236px] max-[600px]:absolute max-h-[223px] mt-auto max-[600px]:w-[60px] object-cover max-[600px]:top-[4px]  max-[600px]:right-[1px] max-[600px]:mt-[20px]"
          style="border-radius: 0 0 0px 0" src="../assets/categories/005.png" alt="" />
      </div>
      <div @click="router.push('/List/Restaurants')"
        class="w-[376px] overflow-hidden relative h-[172px] transition hover:bg-[#e7e7e7] flex justify-between bg-[#F2F2F2] rounded-[25px] cursor-pointer select-none max-[600px]:w-full max-[600px]:max-h-[70px] max-[600px]:min-h-[70px] max-[600px]:rounded-[10px]">
        <p class="max-[600px]:mt-[4px] z-30 max-[600px]:ml-[4px] text-[16px] mt-[14px] ml-[10px] font-[550] font-['Roboto'] text-black max-[600px]:text-[12px]"
          style="letter-spacing: 0.05px">
          Рестораны
        </p>
        <img
          class="max-w-[222px] max-[600px]:absolute max-h-[172px] mt-auto max-[600px]:w-[60px] object-cover max-[600px]:h-[46px] max-[600px]:right-[0px] max-[600px]:mt-[23px]"
          style="border-radius: 0 0 0px 0" src="../assets/categories/006.png" alt="" />
      </div>
      <div @click="router.push('/List/Parks')"
        class="w-[376px] overflow-hidden relative h-[172px] transition hover:bg-[#e7e7e7] flex justify-between bg-[#F2F2F2] rounded-[25px] cursor-pointer select-none max-[600px]:w-full max-[600px]:max-h-[70px] max-[600px]:min-h-[70px] max-[600px]:rounded-[10px]">
        <p class="max-[600px]:mt-[4px] z-30 max-[600px]:ml-[4px] text-[16px] mt-[14px] ml-[10px] font-[550] font-['Roboto'] text-black max-[600px]:text-[12px]"
          style="letter-spacing: 0.05px">
          Парки
        </p>
        <img
          class="max-w-[277px] max-[600px]:absolute max-h-[234px] mt-auto max-[600px]:w-[60px] max-[600px]:h-[50px] max-[600px]:right-[0px] max-[600px]:mt-[20px]"
          style="border-radius: 0 0 0px 0" src="../assets/categories/007.png" alt="" />
      </div>
      <div @click="router.push('/List/TheatersAndCircus')"
        class="w-[376px] overflow-hidden relative h-[172px] transition hover:bg-[#e7e7e7] flex justify-between bg-[#F2F2F2] rounded-[25px] cursor-pointer select-none max-[600px]:w-full max-[600px]:max-h-[70px] max-[600px]:min-h-[70px] max-[600px]:rounded-[10px]">
        <p class="max-[600px]:mt-[4px] z-30 max-[600px]:ml-[4px] text-[16px] mt-[14px] ml-[10px] font-[550] font-['Roboto'] text-black max-[600px]:text-[12px]"
          style="letter-spacing: 0.05px">
          Театры/Цирки
        </p>
        <img
          class="max-w-[168px] mr-[10px] max-[600px]:absolute max-h-[172px] mt-auto max-[600px]:w-[60px] max-[600px]:h-[51px] max-[600px]:right-[-12px] max-[600px]:mt-[20px]"
          style="border-radius: 0 0 0px 0" src="../assets/categories/008.png" alt="" />
      </div>
      <div @click="router.push('/List/Events')"
        class="w-[376px] overflow-hidden relative h-[172px] transition hover:bg-[#e7e7e7] flex justify-between bg-[#F2F2F2] rounded-[25px] cursor-pointer select-none max-[600px]:w-full max-[600px]:max-h-[70px] max-[600px]:min-h-[70px] max-[600px]:rounded-[10px]">
        <p class="max-[600px]:mt-[4px] z-30 max-[600px]:ml-[4px] text-[16px] mt-[14px] ml-[10px] font-[550] font-['Roboto'] text-black max-[600px]:text-[12px]"
          style="letter-spacing: 0.05px">
          Мероприятия
        </p>
        <img
          class="max-w-[174px] max-[600px]:absolute max-h-[171px] mt-auto max-[600px]:w-[60px] max-[600px]:h-[59px] max-[600px]:right-[3px] max-[600px]:mt-[10px] z-[1]"
          style="border-radius: 0 0 0px 0" src="../assets/categories/009.png" alt="" />
      </div>
    </div>
    <div class="flex w-full items-center justify-between mb-[-15px]">
      <h2 class="text-[32px] font-[600] ml-[4px] max-[600px]:text-[14px] font-['Roboto']"
        style="letter-spacing: -0.4px">
        Популярные места
      </h2>
      <div @click.stop="router.push('/List')"
        class="cursor-pointer z-20 flex items-center mr-[-3px] text-[#7F85E8] text-[16px] gap-[5px] max-[600px]:text-[9px]"
        href="">
        Смотреть все
        <img class="max-[600px]:w-[10px] w-[24px]" src="../assets/Arrow.svg" alt="" />
      </div>
    </div>
    <div @click="router.push('/Place')"
      class="pt-[20px] pb-[20px] flex w-full max-[600px]:gap-[10px] max-[600px]:flex-wrap pl-[3px] gap-[40px]">
      <div
        class="w-[273px] cursor-pointer relative max-[600px]:max-w-[44vw] h-[310px] max-[600px]:h-[180px] mt-[10px] max-[600px]:"
        v-for="item in items">
        <Slider
          class="max-w-[272px] max-[600px]:hidden max-[600px]:max-h-[107px] max-[600px]:rounded-[10px] object-cover rounded-t-[16px] max-[600px]:max-w-[45vw] max-h-[173px]" />
        <img
          class="w-[272px] hidden max-[600px]:block max-[600px]:h-[107px] max-[600px]:rounded-[10px] object-cover rounded-t-[16px] max-[600px]:max-w-[45vw] h-[173px]"
          src="../assets/Gallery.png" alt="" />
        <p @click.stop="router.push('/List/Playgrounds')" style="line-height: 20px"
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
            <img class="ml-[16px] mt-[7px] w-[20px] max-[600px]:w-[16px] max-[600px]:ml-0" src="../assets/metro.svg"
              alt="" />
            <p class="text-[16px] max-[600px]:text-[12px] max-[600px]:mt-[6.5px] mt-[9px] ml-[3px] text-[#848282] font-['Roboto']"
              style="letter-spacing: 0.1px">
              Менделеевская
            </p>
          </div>
          <p class="text-[16px] max-[600px]:ml-[0px] max-[600px]:mt-[2px] max-[600px]:text-[11px] ml-[16px] text-[#848282] font-['Roboto']"
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
            <div @click.stop="item.favourite = !item.favourite" @mouseenter="item.favouriteHover = true"
              @mouseleave="item.favouriteHover = false" class="cursor-pointer max-[600px]:hidden ml-[37px] select-none">
              <img v-if="!item.favourite && !item.favouriteHover"
                class=" z-40 max-[600px]:w-[7px] mb-[2px] max-[600px]:mr-[10px]" src="../assets/svg/Vector.svg"
                alt="" />
              <img class=" z-40 max-[600px]:w-[7px] mb-[2px] max-[600px]:mr-[10px]"
                v-if="item.favourite || item.favouriteHover" src="../assets/svg/FavouriteTrue.svg" alt="" />
            </div>
            <div @click.stop="item.favourite = !item.favourite"
              class="cursor-pointer hidden max-[600px]:block ml-[37px] select-none">
              <img v-if="!item.favourite && !item.favouriteHover"
                class=" z-40 max-[600px]:w-[7px] mb-[2px] max-[600px]:mr-[10px]" src="../assets/svg/Vector.svg"
                alt="" />
              <img class=" z-40 max-[600px]:w-[7px] mb-[2px] max-[600px]:mr-[10px]"
                v-if="item.favourite || item.favouriteHover" src="../assets/svg/FavouriteTrue.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-between items-center mt-[43px] max-[600px]:mb-[-24px]">
      <h2 class="text-[32px] font-[500] ml-[1.5px] max-[600px]:text-[14px]" style="letter-spacing: -0.4px">
        Интересные подборки
      </h2>
      <div @click="router.push('/ListArticles')"
        class="cursor-pointer flex mt-[9px] max-[600px]:mt-[0px] items-center mr-[-0.5px] text-[#7F85E8] text-[16px] gap-[5px] max-[600px]:text-[9px]"
        href="">
        Смотреть все
        <img class="max-[600px]:w-[10px] w-[24px]" src="../assets/Arrow.svg" alt="" />
      </div>
    </div>
    <div ref="slider" @mousedown.stop="startDrag" @mouseup.stop="stopDrag" @mousemove.stop="drag"
      @mouseleave.stop="stopDrag" style="cursor: grab;"
      class="flex gap-[54px] scroll max-[600px]:pl-[10px] pl-[20px] w-[1240px] mt-[41px] max-[600px]:gap-[10px] max-[600px]:w-[95vw] overflow-scroll max-[600px]:overflow-scroll max-[600px]:pb-[5px] pt-[8px]">
      <div @click="router.push('/Article')" class="cursor-pointer w-full" v-for="item in items2">
        <div class="relative">
          <img
            class="absolute w-[190px] top-[-6.67px] left-[-6.7px] h-[190px] max-[600px]:w-[86px] max-[600px]:h-[86px] max-[600px]:top-[-2.7px] max-[600px]:left-[-3px]"
            src="../assets/Stories.png" alt="" />
          <img src="../assets/Gallery.png"
            class="w-[176.67px] h-[176.67px] max-[600px]:w-[80px] max-[600px]:h-[80px] rounded-[50%] object-cover"
            alt="" />
        </div>
        <p class="w-[189px] max-[600px]:text-[10px] max-[600px]:max-w-[85px] max-[600px]:max-h-[36px] max-[600px]:overflow-hidden max-[600px]:text-ellipsis relative text-center right-[7px] h-[74px] text-[15px] text-[#252527] font-[450] max-[600px]:mt-[6px] mt-[26px] text-['Inter'] italic"
          style="line-height: 20px">
          {{ item.name }}
        </p>
      </div>
    </div>
    <div class="flex w-full justify-between items mt-[37px] ml-[2px]">
      <h2 class="text-[32px] font-[500] ml-[1.5px] max-[600px]:text-[14px]" style="letter-spacing: -0.4px">
        Карта мест
      </h2>
      <div @click="router.push('/Map')"
        class="cursor-pointer flex mt-[9px] max-[600px]:mt-[0px] items-center mr-[-0.5px] text-[#7F85E8] text-[16px] max-[600px]:text-[8px] gap-[5px]"
        href="">
        Перейти на карту
        <img class="max-[600px]:w-[10px] w-[24px]" src="../assets/Arrow.svg" alt="" />
      </div>
    </div>
    <div
      class="rounded-[20px] relative max-[600px]:mb-[110px] border ml-[2px] mt-[20px] mb-[21px] max-w-[1207px] max-h-[604px] max-[600px]:max-w-[395px] max-[400px]:max-w-[360px] max-[600px]:max-h-[326px]"
      style="overflow: hidden">
      <div class="maps rounded-[20px] max-[600px]:max-h-[326px]" ref="mapRef" id="map" style="width: 1207px; height: 704px"></div>
      <div v-if="selectedPoint"
        class="z-10 absolute top-[calc(50%-100px)] max-[600px]:left-[calc(50%-200px)] left-[calc(50%-300px)] max-[600px]:scale-75 max-[600px]:absolute max-[600px]:top-[calc(50%-90px)] max-[600px]:right-2"
        style="">
        <div class="w-[273px] z-[0] cursor-pointer relative max-[600px]:max-w-[44vw] max-[600px]:h-[180px]">
          <img
            class="w-[272px] max-[600px]:h-[107px] max-[600px]:rounded-[10px] object-cover rounded-t-[16px] max-[600px]:max-w-[45vw] h-[173px]"
            src="../assets/Gallery.png" alt="" />
          <p style="line-height: 20px"
            class="absolute top-[10px] max-[600px]:w-[69px] max-[600px]:h-[12px] max-[600px]:text-[7px] text-[10.4px] text-white font-[300] right-[8px] flex justify-center items-center bg-[#7F84D0] w-[107px] h-[28px] rounded-[4px]">
            Детские площадки
          </p>
          <div
            class="bg-[#F5F5F6] pb-[7px] max-[600px]:relative max-[600px]:top-[-10px] px-[5px] max-[600px]:bg-white max-[600px]:max-w-[45vw] max-[600px]:min-w-[45vw] w-[272px] max-[600px]:h-fit max-[600px]:pb-[5px] rounded-b-[16px]">
            <h3
              class="text-[22px] pt-[4px] ml-[16px] max-[600px]:ml-0 max-[600px]:text-[13px] max-[600px]:font-[600] font-medium font-['Roboto']">
              Парк Лукоморье
            </h3>
            <div class="flex items-center mt-[-2px]">
              <img class="ml-[16px] mt-[7px] max-[600px]:w-[16px] w-[20px] max-[600px]:ml-0" src="../assets/metro.svg"
                alt="" />
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
              <div @click.stop="favourite = !favourite" @mouseenter="favouriteHover = true"
                @mouseleave="favouriteHover = false" class="cursor-pointer max-[600px]:hidden ml-[37px] select-none">
                <img v-if="!favourite && !favouriteHover"
                  class="ml-auto mr-[16px] max-[600px]:w-[7px] mb-[2px] max-[600px]:mr-[10px]"
                  src="../assets/svg/Vector.svg" alt="" />
                <img class="ml-auto mr-[17px] max-[600px]:w-[7px] mb-[2px] max-[600px]:mr-[10px]"
                  v-if="favourite || favouriteHover" src="../assets/svg/FavouriteTrue.svg" alt="" />
              </div>
              <div @click.stop="favourite = !favourite"
                class="cursor-pointer hidden max-[600px]:block ml-[37px] select-none">
                <img v-if="!favourite && !favouriteHover"
                  class="ml-auto mr-[16px] max-[600px]:w-[7px] mb-[2px] max-[600px]:mr-[10px]"
                  src="../assets/svg/Vector.svg" alt="" />
                <img class="ml-auto mr-[17px] max-[600px]:w-[7px] mb-[2px] max-[600px]:mr-[10px]"
                  v-if="favourite || favouriteHover" src="../assets/svg/FavouriteTrue.svg" alt="" />
              </div>
            </div>
            <button @click="router.push('/Place')"
              class="max-[600px]:[display:none] mt-[7px] rounded-[8px] block mx-auto w-[240px] h-[38px] bg-[#8F94EC] font-[Inter] font-semibold text-[16px] text-white">
              Подробнее
            </button>
            <button @click="router.push('/Place')"
              class="w-[108px] max-[600px]:block font-['Inter'] font-[500] rounded-[3px] text-[10px] text-white mx-[auto] [display:none] mb-[7px] h-[22px] mt-[7px] bg-[#8F94EC]">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

* {
  font-family: "Roboto";
}

.scroll::-webkit-scrollbar{
  width: 0px;
}
</style>
