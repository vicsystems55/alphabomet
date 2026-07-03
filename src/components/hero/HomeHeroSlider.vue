<template>
  <section class="relative h-screen min-h-[720px] overflow-hidden bg-primary">
    <Swiper
      :modules="[Autoplay, EffectFade, Navigation, Pagination]"
      effect="fade"
      :loop="true"
      :speed="1200"
      :autoplay="{
        delay: 9000,
        disableOnInteraction: false,
      }"
      :navigation="{
        nextEl: '.hero-next',
        prevEl: '.hero-prev',
      }"
      :pagination="{
        el: '.hero-pagination',
        clickable: true,
        renderBullet,
      }"
      class="h-full"
      @slideChangeTransitionStart="animateSlide"
      @swiper="onSwiper"
    >
      <SwiperSlide
        v-for="slide in homeSlides"
        :key="slide.id"
        class="relative h-full"
      >
        <div
          class="hero-bg absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${slide.image})` }"
        ></div>

        <div class="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/30 to-transparent"></div>
        <div class="absolute inset-0 bg-black/20"></div>

        <div class="relative z-10 mx-auto flex h-full max-w-container items-center px-6">
          <div class="max-w-3xl pt-20">
            <p class="hero-kicker mb-6 text-sm font-semibold uppercase tracking-[0.32em] text-secondary">
              {{ slide.label }}
            </p>

            <h1 class="hero-title font-heading text-hero leading-hero text-ivory">
              {{ slide.title }}
            </h1>

            <p class="hero-subtitle mt-8 max-w-xl text-lg leading-[1.8] text-ivory/85">
              {{ slide.subtitle }}
            </p>

            <RouterLink
              :to="slide.buttonLink"
              class="hero-button mt-10 inline-flex items-center gap-4 border border-secondary px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-secondary transition hover:bg-secondary hover:text-primary"
            >
              {{ slide.buttonText }}
              <span>→</span>
            </RouterLink>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <button class="hero-prev absolute left-8 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/40 text-secondary">
      ‹
    </button>

    <button class="hero-next absolute right-8 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/40 text-secondary">
      ›
    </button>

    <div class="hero-pagination absolute bottom-14 left-1/2 z-20 flex -translate-x-1/2 items-center gap-6"></div>
  </section>
</template>

<script setup>
import { nextTick } from "vue";
import gsap from "gsap";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { homeSlides } from "../../data/homeSlides";

let swiperInstance = null;

const onSwiper = (swiper) => {
  swiperInstance = swiper;
  nextTick(() => {
    animateSlide();
  });
};

const renderBullet = (index, className) => {
  return `<span class="${className}">0${index + 1}</span>`;
};

const animateSlide = () => {
  nextTick(() => {
    const activeSlide = document.querySelector(".swiper-slide-active");

    if (!activeSlide) return;

    const bg = activeSlide.querySelector(".hero-bg");
    const kicker = activeSlide.querySelector(".hero-kicker");
    const title = activeSlide.querySelector(".hero-title");
    const subtitle = activeSlide.querySelector(".hero-subtitle");
    const button = activeSlide.querySelector(".hero-button");

    gsap.fromTo(
      bg,
      { scale: 1.08 },
      { scale: 1, duration: 8, ease: "power2.out" }
    );

    gsap.fromTo(
      [kicker, title, subtitle, button],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  });
};
</script>

<style>
.hero-pagination .swiper-pagination-bullet {
  width: auto;
  height: auto;
  background: transparent;
  opacity: 0.45;
  color: #dcc190;
  font-size: 14px;
  letter-spacing: 0.2em;
}

.hero-pagination .swiper-pagination-bullet-active {
  opacity: 1;
  color: #dcc190;
}

.hero-pagination .swiper-pagination-bullet-active::after {
  content: "";
  display: inline-block;
  width: 70px;
  height: 1px;
  margin-left: 14px;
  vertical-align: middle;
  background: #dcc190;
}
</style>