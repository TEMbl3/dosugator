<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import clusterIcon from "../assets/cluster.svg";

const router = useRouter();

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

const open = ref("");
const age = ref("");
const distance = ref("");
const selectedPoint = ref(null);
const popupStyle = ref({ top: "0px", left: "0px" });

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
        map.setCenter(clickedPoint.coordinates)
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

const items = ref([
  { label: "Детские площадки", checked: false, name: "Playgrounds" },
  { label: "Познавательное", checked: false, name: "Educational" },
  { label: "Театры/Цирк", checked: false, name: "TheatersAndCircus" },
  { label: "Зоопарки", checked: false, name: "Zoo" },
  { label: "Парки", checked: false, name: "Parks" },
  { label: "Игровые центры/Аттракционы", checked: false, name: "GamingCentersAndAttractions" },
  { label: "Рестораны", checked: false, name: "Restaurants" },
  { label: "Мероприятия", checked: false, name: "Events" },
]);

const free = ref(false);
const ages = ref([
  { label: "Все", checked: false, name: "Playgrounds" },
  { label: "0+", checked: false, name: "Playgrounds" },
  { label: "3+", checked: false, name: "Playgrounds" },
  { label: "6+", checked: false, name: "Playgrounds" },
  { label: "10+", checked: false, name: "Playgrounds" },
]);

const openOpt = ref((e) => {
  if (open.value === e) {
    open.value = "";
  } else {
    open.value = e;
  }
});

function handleClickOutside(event) {
  if (!event.target.closest("[data-click-outside]")) {
    open.value = "";
  }
}

const favourite = ref(false);
const favouriteHover = ref(false);
const openMobileSetings = ref(false);


const clear = ref(() => {
  items.value.forEach(e => {
    e.checked = false
  });
  age.value = '';
  distance.value = '';
  free.value = false;
})

</script>

<template>
  <div v-if="openMobileSetings"
    class="fixed overflow-y-auto bg-white z-[80] max-h-[100vh] pb-[110px] px-[20px] top-0 left-0 w-[100vw]">
    <div class="flex mt-[26px] items-center justify-between">
      <img @click="openMobileSetings = false" src="../assets/burger/Close.svg" alt="" />
      <a @click="clear" class="text-[#8F94EC] text-[14px] font-['Inter'] mr-[8px] font-medium"
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
    <div class="w-[272px] select-none mt-[27px] ml-[2px] h-[57px]">
      <p class="text-[14px] font-semibold text-[#98A0B4] mb-[8px] font-['Inter']" style="line-height: 17px">
        Возраст
      </p>
      <div class="w-[271px] h-[32px] flex items-center">
        <div @click="age = age === 'Все' ? '' : 'Все'" :class="{
          'bg-[#8f94ec70]': age === 'Все',
          'bg-[#F2F4F7]': age !== 'Все',
        }" class="w-[62px] h-[32px] flex justify-center items-center border-r rounded-l-[5px] border-[#D9D9D9]">
          <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
            Все
          </p>
        </div>
        <div @click="age = age === '0+' ? '' : '0+'" :class="{
          'bg-[#8f94ec70]': age === '0+',
          'bg-[#F2F4F7]': age !== '0+',
        }" class="w-[52px] h-[32px] flex justify-center items-center border-r border-[#D9D9D9]">
          <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
            0+
          </p>
        </div>
        <div @click="age = age === '3+' ? '' : '3+'" :class="{
          'bg-[#8f94ec70]': age === '3+',
          'bg-[#F2F4F7]': age !== '3+',
        }" class="w-[52px] h-[32px] flex justify-center items-center border-r border-[#D9D9D9]">
          <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
            3+
          </p>
        </div>
        <div @click="age = age === '6+' ? '' : '6+'" :class="{
          'bg-[#8f94ec70]': age === '6+',
          'bg-[#F2F4F7]': age !== '6+',
        }" class="w-[52px] h-[32px] flex justify-center items-center border-r border-[#D9D9D9]">
          <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
            6+
          </p>
        </div>
        <div @click="age = age === '10+' ? '' : '10+'" :class="{
          'bg-[#8f94ec70]': age === '10+',
          'bg-[#F2F4F7]': age !== '10+',
        }" class="w-[52px] h-[32px] rounded-r-[5px] flex justify-center items-center">
          <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
            10+
          </p>
        </div>
      </div>
    </div>
    <div class="w-[104px] select-none mt-[22px] ml-[2px] h-[49px]">
      <p class="text-[14px] font-semibold text-[#98A0B4] mb-[8px] font-['Inter']" style="line-height: 17px">
        Стоимость
      </p>
      <label class="relative flex items-center gap-[10px] cursor-pointer">
        <input v-model="free" type="checkbox" class="absolute opacity-0 peer" />
        <span class="custom-checkbox"></span>
        <span style="line-height: 16px"
          class="text-[#4B4B4B] text-[14px] font-medium font-['Inter'] cursor-pointer">Бесплатно</span>
      </label>
    </div>
    <div class="w-[271px] select-none mt-[22px] ml-[2px] h-[117px]">
      <p class="text-[14px] font-semibold text-[#98A0B4] mb-[16px] font-['Inter']" style="line-height: 17px">
        Растояние от адреса
      </p>
      <input v-model="distance" placeholder="Введите адрес"
        class="w-full font-['Inter'] text-[14px] font-medium placeholder-[#98A0B4] pl-[10px] border border-[#D0D5DD] rounded-[5px] h-[38px]"
        type="text" />
      <div class="w-[271px] mt-[14px] h-[32px] flex items-center">
        <div @click="distance = distance === '500м' ? '' : '500м'" :class="{
          'bg-[#8f94ec70]': distance === '500м',
          'bg-[#F2F4F7]': distance !== '500м',
        }" class="w-[62px] h-[32px] flex justify-center items-center border-r rounded-l-[5px] border-[#D9D9D9]">
          <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
            500 м
          </p>
        </div>
        <div @click="distance = distance === '1км' ? '' : '1км'" :class="{
          'bg-[#8f94ec70]': distance === '1км',
          'bg-[#F2F4F7]': distance !== '1км',
        }" class="w-[52px] h-[32px] flex justify-center items-center border-r border-[#D9D9D9]">
          <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
            1 км
          </p>
        </div>
        <div @click="distance = distance === '2км' ? '' : '2км'" :class="{
          'bg-[#8f94ec70]': distance === '2км',
          'bg-[#F2F4F7]': distance !== '2км',
        }" class="w-[52px] h-[32px] flex justify-center items-center border-r border-[#D9D9D9]">
          <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
            2 км
          </p>
        </div>
        <div @click="distance = distance === '5км' ? '' : '5км'" :class="{
          'bg-[#8f94ec70]': distance === '5км',
          'bg-[#F2F4F7]': distance !== '5км',
        }" class="w-[52px] h-[32px] flex justify-center items-center border-r border-[#D9D9D9]">
          <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
            5 км
          </p>
        </div>
        <div @click="distance = distance === '10км' ? '' : '10км'" :class="{
          'bg-[#8f94ec70]': distance === '10км',
          'bg-[#F2F4F7]': distance !== '10км',
        }" class="w-[52px] h-[32px] rounded-r-[5px] flex justify-center items-center">
          <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
            10 км
          </p>
        </div>
      </div>
    </div>
    <button
      class="bg-[#8F94EC] w-[100%] h-[38px] text-white rounded-[8px] font-['Inter'] font-[400] mt-[22px] text-[16px]">
      Найти
    </button>
  </div>
  <div @click="handleClickOutside"
    class="flex justify-center max-[600px]:block mx-auto w-full max-[600px]:overflow-x-hidden overflow-y-hidden">
    <div class="w-[302px] max-[600px]:[display:none] h-[732px] h-min-[732px] px-[17px]">
      <div class="flex mt-[20px] items-center justify-between">
        <p class="text-[#4B4B4B] text-[20px] mt-[1px] font-semibold overflow-hidden" style="line-height: 20px">
          Фильтры
        </p>
        <a @click="clear" class="text-[#8F94EC] cursor-pointer select-none text-[14px] font-['Inter'] mr-[8px] font-medium" style="line-height: 20px">Сбросить
          все</a>
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
      <div class="w-[272px] select-none mt-[27px] ml-[2px] h-[57px]">
        <p class="text-[14px] font-semibold text-[#98A0B4] mb-[8px] font-['Inter']" style="line-height: 17px">
          Возраст
        </p>
        <div class="w-[271px] h-[32px] flex items-center">
          <div @click="age = age === 'Все' ? '' : 'Все'" :class="{
            'bg-[#8f94ec70]': age === 'Все',
            'bg-[#F2F4F7]': age !== 'Все',
          }"
            class="w-[62px] hover:bg-[#8f94ec70] transition h-[32px] flex justify-center items-center border-r rounded-l-[5px] border-[#D9D9D9]">
            <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
              Все
            </p>
          </div>
          <div @click="age = age === '0+' ? '' : '0+'" :class="{
            'bg-[#8f94ec70]': age === '0+',
            'bg-[#F2F4F7]': age !== '0+',
          }"
            class="w-[52px] hover:bg-[#8f94ec70] transition h-[32px] flex justify-center items-center  border-r border-[#D9D9D9]">
            <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
              0+
            </p>
          </div>
          <div @click="age = age === '3+' ? '' : '3+'" :class="{
            'bg-[#8f94ec70]': age === '3+',
            'bg-[#F2F4F7]': age !== '3+',
          }"
            class="w-[52px] hover:bg-[#8f94ec70] transition h-[32px] flex justify-center items-center  border-r border-[#D9D9D9]">
            <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
              3+
            </p>
          </div>
          <div @click="age = age === '6+' ? '' : '6+'" :class="{
            'bg-[#8f94ec70]': age === '6+',
            'bg-[#F2F4F7]': age !== '6+',
          }"
            class="w-[52px] hover:bg-[#8f94ec70] transition h-[32px] flex justify-center items-center  border-r border-[#D9D9D9]">
            <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
              6+
            </p>
          </div>
          <div @click="age = age === '10+' ? '' : '10+'" :class="{
            'bg-[#8f94ec70]': age === '10+',
            'bg-[#F2F4F7]': age !== '10+',
          }"
            class="w-[52px] hover:bg-[#8f94ec70] transition h-[32px] rounded-r-[5px] flex justify-center items-center">
            <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
              10+
            </p>
          </div>
        </div>
      </div>
      <div class="w-[104px] select-none mt-[22px] ml-[2px] h-[49px]">
        <p class="text-[14px] font-semibold text-[#98A0B4] mb-[8px] font-['Inter']" style="line-height: 17px">
          Стоимость
        </p>
        <label class="relative flex items-center gap-[10px] cursor-pointer">
          <input v-model="free" type="checkbox" class="absolute opacity-0 peer" />
          <span class="custom-checkbox"></span>
          <span style="line-height: 16px"
            class="text-[#4B4B4B] text-[14px] font-medium font-['Inter'] cursor-pointer">Бесплатно</span>
        </label>
      </div>
      <div class="w-[271px] select-none mt-[22px] ml-[2px]">
        <p class="text-[14px] font-semibold text-[#98A0B4] mb-[16px] font-['Inter']" style="line-height: 17px">
          Растояние от адреса
        </p>
        <input v-model="distance" placeholder="Введите адрес"
          class="w-full font-['Inter'] text-[14px] font-medium placeholder-[#98A0B4] pl-[10px] border border-[#D0D5DD] rounded-[5px] h-[38px]"
          type="text" />
        <div class="w-[271px] mt-[14px] h-[32px] flex items-center">
          <div @click="distance = distance === '500м' ? '' : '500м'" :class="{
            'bg-[#8f94ec70]': distance === '500м',
            'bg-[#F2F4F7]': distance !== '500м',
          }"
            class="w-[62px] hover:bg-[#8f94ec70] transition h-[32px] flex justify-center items-center border-r rounded-l-[5px] border-[#D9D9D9]">
            <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
              500 м
            </p>
          </div>
          <div @click="distance = distance === '1км' ? '' : '1км'" :class="{
            'bg-[#8f94ec70]': distance === '1км',
            'bg-[#F2F4F7]': distance !== '1км',
          }"
            class="w-[52px] hover:bg-[#8f94ec70] transition h-[32px] flex justify-center items-center border-r border-[#D9D9D9]">
            <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
              1 км
            </p>
          </div>
          <div @click="distance = distance === '2км' ? '' : '2км'" :class="{
            'bg-[#8f94ec70]': distance === '2км',
            'bg-[#F2F4F7]': distance !== '2км',
          }"
            class="w-[52px] hover:bg-[#8f94ec70] transition h-[32px] flex justify-center items-center border-r border-[#D9D9D9]">
            <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
              2 км
            </p>
          </div>
          <div @click="distance = distance === '5км' ? '' : '5км'" :class="{
            'bg-[#8f94ec70]': distance === '5км',
            'bg-[#F2F4F7]': distance !== '5км',
          }"
            class="w-[52px] hover:bg-[#8f94ec70] transition h-[32px] flex justify-center items-center border-r border-[#D9D9D9]">
            <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
              5 км
            </p>
          </div>
          <div @click="distance = distance === '10км' ? '' : '10км'" :class="{
            'bg-[#8f94ec70]': distance === '10км',
            'bg-[#F2F4F7]': distance !== '10км',
          }"
            class="w-[52px] hover:bg-[#8f94ec70] transition h-[32px] rounded-r-[5px] flex justify-center items-center">
            <p class="font-['Inter'] font-medium text-[14px] text-[#4B4B4B]">
              10 км
            </p>
          </div>
        </div>
        <button
          class="bg-[#8F94EC] w-[272px] h-[38px] text-white rounded-[8px] font-['Inter'] font-[400] mt-[22px] text-[16px]">
          Найти
        </button>
      </div>
    </div>
    <div
      class="[display:none] mb-[19px] z-[60] w-full h-[36px] relative ml-[2vw] gap-[10px] mt-[20px] max-[600px]:flex items-center">
      <img class="" @click="router.push('/')" src="../assets/list/Chevron_Down.svg" alt="" />
      <img @click="openMobileSetings = true" class="h-[24px] pt-[4px] bg-white shadow rounded-[5px]"
        src="../assets/svg/options.svg" alt="" />
      <div data-click-outside @click="openOpt('cat')" :class="{ 'bg-[#F2F2F2]': open === 'cat' }"
        class="flex items-center gap-[2px] pl-[8px] pr-[7px] h-[28px] font-['Roboto'] text-[13px] text-[#3A3A49] shadow rounded-[5px]">
        Категории
        <img class="rotate-[270deg]" src="../assets/list/Chevron_Down.svg" alt="" />
      </div>
      <div data-click-outside v-if="open === 'cat'"
        class="absolute px-[10px] py-[10px] bg-white border border-[#e4e5e6] rounded-[5px] z-10 top-[29px] left-[60px]">
        <div class="flex-col flex gap-[15px]">
          <div v-for="item in items" :key="item.id" class="flex select-none">
            <label class="relative flex items-center gap-[10px] cursor-pointer">
              <input type="checkbox" v-model="item.checked" class="absolute opacity-0 peer" />
              <span class="custom-checkbox"></span>
              <span style="line-height: 16px"
                class="text-[#4B4B4B] text-[14px] font-medium font-['Inter'] cursor-pointer">{{ item.label }}</span>
            </label>
          </div>
        </div>
      </div>
      <div data-click-outside @click="openOpt('age')" :class="{ 'bg-[#F2F2F2]': open === 'age' }"
        class="flex items-center gap-[2px] pl-[8px] pr-[7px] h-[28px] font-['Roboto'] text-[13px] text-[#3A3A49] shadow rounded-[5px]">
        Возраст
        <img class="rotate-[270deg]" src="../assets/list/Chevron_Down.svg" alt="" />
      </div>
      <div data-click-outside v-if="open === 'age'"
        class="absolute px-[10px] py-[10px] bg-white border border-[#e4e5e6] rounded-[5px] z-10 top-[29px] left-[170px]">
        <div class="flex-col flex gap-[15px]">
          <div v-for="item in ages" :key="item.id" class="flex select-none">
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
      <div data-click-outside @click="openOpt('pri')" :class="{ 'bg-[#F2F2F2]': open === 'pri' }"
        class="flex items-center gap-[2px] pl-[8px] pr-[7px] h-[28px] font-['Roboto'] text-[13px] text-[#3A3A49] shadow rounded-[5px]">
        Стоимость
        <img class="rotate-[270deg]" src="../assets/list/Chevron_Down.svg" alt="" />
      </div>
      <div data-click-outside v-if="open === 'pri'"
        class="absolute px-[10px] py-[10px] bg-white border border-[#e4e5e6] rounded-[5px] z-10 top-[29px] right-[10px]">
        <div class="flex-col flex gap-[15px]">
          <div class="flex select-none">
            <!-- Скрываем стандартный чекбокс и используем кастомный -->
            <label class="relative flex items-center gap-[10px] cursor-pointer">
              <input  type="checkbox" v-model="free" class="absolute opacity-0 peer" />
              <span class="custom-checkbox"></span>
              <span style="line-height: 16px"
                class="text-[#4B4B4B] text-[14px] font-medium font-['Inter'] cursor-pointer">Бесплатно</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex">
      <div class="max-h-[735px] relative" @click="handleClickOutside">
        <div class="maps" ref="mapRef" style="height: 735px; width: calc(100vw - 302px)"></div>
        <div v-if="selectedPoint"
          class="z-10 fixed top-[calc(50vh-100px)] left-[calc(50%-150px)] max-[600px]:absolute max-[600px]:top-[calc(50%-90px)] max-[600px]:right-2"
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
                  <img class="mt-[-2px] max-[600px]:w-[12px]" src="../assets/svg/star.svg" alt="" />
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
  </div>
</template>
<style scoped>
@media (max-width: 600px) {
  .maps {
    min-width: 100vw;
    max-width: 100vw;
    max-height: calc(100svh - 275px);
  }
}
</style>
