<template>
  <section
    class="portfolio-hero"
    :class="{ 'portfolio-hero--light': !isDark }"
    aria-label="Featured Alphabomet companies"
  >
    <Swiper
      :modules="[Autoplay, Keyboard, A11y]"
      :loop="true"
      :speed="1100"
      :keyboard="{ enabled: true }"
      :a11y="{ enabled: true }"
      :autoplay="{
        delay: autoplayDelay,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      class="portfolio-hero__swiper"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide v-for="(slide, index) in homeSlides" :key="slide.id">
        <div class="portfolio-hero__media" aria-hidden="true">
          <div
            class="portfolio-hero__background"
            :style="{
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: slide.imagePosition,
            }"
          ></div>
          <div class="portfolio-hero__overlay"></div>
        </div>
        <div class="portfolio-hero__grid" aria-hidden="true"></div>

        <div class="portfolio-hero__inner">
          <div class="portfolio-hero__content">
            <div class="portfolio-hero__identity">
              <div class="portfolio-hero__logo">
                <CompanyLogo :logo-key="slide.logoKey" :alt="`${slide.company} logo`" />
              </div>
              <p>
                <span>0{{ index + 1 }}</span>
                {{ slide.sector }}
              </p>
            </div>

            <h1>{{ slide.title }}</h1>
            <p class="portfolio-hero__summary">{{ slide.subtitle }}</p>

            <RouterLink :to="slide.buttonLink" class="portfolio-hero__cta">
              {{ slide.buttonText }}
              <ArrowUpRight :size="18" stroke-width="1.7" />
            </RouterLink>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <div class="portfolio-hero__controls">
      <button type="button" aria-label="Previous slide" @click="previousSlide">
        <ArrowLeft :size="18" />
      </button>

      <div class="portfolio-hero__pagination" role="tablist" aria-label="Choose a featured company">
        <button
          v-for="(slide, index) in homeSlides"
          :key="slide.id"
          type="button"
          role="tab"
          :aria-selected="activeIndex === index"
          :aria-label="`Show ${slide.company}`"
          :class="{ 'is-active': activeIndex === index }"
          @click="goToSlide(index)"
        >
          <span>0{{ index + 1 }}</span>
          <strong>{{ slide.company }}</strong>
          <i aria-hidden="true"></i>
        </button>
      </div>

      <button type="button" aria-label="Next slide" @click="nextSlide">
        <ArrowRight :size="18" />
      </button>
    </div>

    <p class="sr-only" aria-live="polite">
      Slide {{ activeIndex + 1 }} of {{ homeSlides.length }}: {{ homeSlides[activeIndex].company }}
    </p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@lucide/vue";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import CompanyLogo from "../shared/CompanyLogo.vue";

import "swiper/css";

import { homeSlides } from "../../data/homeSlides";
import { useTheme } from "../../composables/useTheme";

const autoplayDelay = 6800;
const activeIndex = ref(0);
const { isDark } = useTheme();
let swiperInstance;

const onSwiper = (swiper) => {
  swiperInstance = swiper;
  activeIndex.value = swiper.realIndex;
};

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex;
};

const previousSlide = () => swiperInstance?.slidePrev();
const nextSlide = () => swiperInstance?.slideNext();
const goToSlide = (index) => swiperInstance?.slideToLoop(index);
</script>

<style scoped>
.portfolio-hero {
  position: relative;
  isolation: isolate;
  min-height: max(48rem, 100svh);
  overflow: hidden;
  background: #080506;
  color: #f8f4ee;
}

.portfolio-hero__swiper,
.portfolio-hero :deep(.swiper-wrapper),
.portfolio-hero :deep(.swiper-slide) {
  min-height: max(48rem, 100svh);
}

.portfolio-hero :deep(.swiper-slide) {
  position: relative;
  isolation: isolate;
  contain: paint;
  overflow: hidden;
}

.portfolio-hero__media,
.portfolio-hero__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.portfolio-hero__media {
  z-index: 0;
  overflow: hidden;
}

.portfolio-hero__background,
.portfolio-hero__overlay {
  position: absolute;
  inset: 0;
}

.portfolio-hero__background {
  z-index: 0;
  background-repeat: no-repeat;
  background-size: cover;
  transform: scale(1.06);
}

.portfolio-hero :deep(.swiper-slide-active) .portfolio-hero__background {
  animation: hero-image-drift 7.5s ease-out both;
}

.portfolio-hero__overlay {
  z-index: 1;
  background:
    linear-gradient(90deg, rgba(19, 1, 2, .96), rgba(49, 5, 8, .82) 44%, rgba(10, 4, 4, .22) 76%, rgba(0, 0, 0, .08)),
    linear-gradient(0deg, rgba(10, 1, 2, .8), transparent 58%);
}

.portfolio-hero__grid {
  z-index: 2;
  opacity: .1;
  background-image:
    linear-gradient(rgba(220, 193, 144, .22) 1px, transparent 1px),
    linear-gradient(90deg, rgba(220, 193, 144, .22) 1px, transparent 1px);
  background-size: 5rem 5rem;
  mask-image: linear-gradient(90deg, black, transparent 58%);
}

.portfolio-hero__inner {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  width: min(100% - 3rem, 82rem);
  min-height: max(48rem, 100svh);
  margin: 0 auto;
  padding: 9rem 0 11rem;
}

.portfolio-hero__content { max-width: 52rem; }

.portfolio-hero__identity {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.6rem;
}

.portfolio-hero__logo {
  display: grid;
  width: 9rem;
  height: 4.6rem;
  place-items: center;
  padding: .65rem 1rem;
  border: 1px solid rgba(220, 193, 144, .2);
  background: rgba(5, 4, 4, .74);
  backdrop-filter: blur(12px);
}

.portfolio-hero__logo img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.portfolio-hero__identity p {
  margin: 0;
  color: var(--gold);
  font-size: .66rem;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
}

.portfolio-hero__identity p span {
  margin-right: .7rem;
  color: rgba(248, 244, 238, .45);
}

.portfolio-hero h1 {
  max-width: 50rem;
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(3.7rem, 6.6vw, 6.8rem);
  font-weight: 600;
  letter-spacing: -.04em;
  line-height: .9;
  text-wrap: balance;
}

.portfolio-hero__summary {
  max-width: 39rem;
  margin: 1.8rem 0 0;
  color: rgba(248, 244, 238, .72);
  font-size: clamp(.92rem, 1.25vw, 1.05rem);
  line-height: 1.8;
}

.portfolio-hero__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .9rem;
  min-height: 3.45rem;
  margin-top: 2.2rem;
  padding: 0 1.4rem;
  border: 1px solid var(--gold);
  background: var(--gold);
  color: var(--wine-deep);
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  transition: 220ms ease;
}

.portfolio-hero__cta:hover { background: #f2d794; transform: translateY(-2px); }

.portfolio-hero :deep(.swiper-slide-active) .portfolio-hero__identity,
.portfolio-hero :deep(.swiper-slide-active) h1,
.portfolio-hero :deep(.swiper-slide-active) .portfolio-hero__summary,
.portfolio-hero :deep(.swiper-slide-active) .portfolio-hero__cta {
  animation: hero-content-in .9s cubic-bezier(.2, .72, .2, 1) both;
}

.portfolio-hero :deep(.swiper-slide-active) h1 { animation-delay: .08s; }
.portfolio-hero :deep(.swiper-slide-active) .portfolio-hero__summary { animation-delay: .16s; }
.portfolio-hero :deep(.swiper-slide-active) .portfolio-hero__cta { animation-delay: .24s; }

.portfolio-hero__controls {
  position: absolute;
  right: max(1.5rem, calc((100vw - 82rem) / 2));
  bottom: 2.3rem;
  left: max(1.5rem, calc((100vw - 82rem) / 2));
  z-index: 4;
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
  align-items: center;
  gap: 1rem;
}

.portfolio-hero__controls > button {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border: 1px solid rgba(220, 193, 144, .36);
  border-radius: 50%;
  background: rgba(8, 5, 6, .46);
  color: var(--gold);
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: 200ms ease;
}

.portfolio-hero__controls > button:hover {
  border-color: var(--gold);
  background: var(--gold);
  color: var(--wine-deep);
}

.portfolio-hero__pagination {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: .8rem;
}

.portfolio-hero__pagination button {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: .55rem;
  padding: .75rem 0;
  border: 0;
  background: transparent;
  color: rgba(248, 244, 238, .5);
  text-align: left;
  cursor: pointer;
  transition: color 180ms ease;
}

.portfolio-hero__pagination button span { color: var(--gold); font-size: .55rem; font-weight: 700; }

.portfolio-hero__pagination button strong {
  overflow: hidden;
  font-size: .57rem;
  font-weight: 600;
  letter-spacing: .04em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.portfolio-hero__pagination button i {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  overflow: hidden;
  background: rgba(248, 244, 238, .18);
}

.portfolio-hero__pagination button i::after {
  position: absolute;
  inset: 0;
  background: var(--gold);
  content: "";
  transform: scaleX(0);
  transform-origin: left;
}

.portfolio-hero__pagination button.is-active { color: #f8f4ee; }
.portfolio-hero__pagination button.is-active i::after { animation: hero-progress 6.8s linear both; }

.portfolio-hero--light { background: #ffffff; color: var(--text-primary); }

.portfolio-hero--light .portfolio-hero__overlay {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, .78) 0%,
    rgba(255, 255, 255, .64) 48%,
    rgba(255, 255, 255, .48) 100%
  );
}

.portfolio-hero--light .portfolio-hero__logo {
  border-color: rgba(128, 20, 24, .16);
  background: rgba(255, 255, 255, .86);
  box-shadow: 0 .75rem 2rem rgba(47, 35, 33, .1);
}

.portfolio-hero--light .portfolio-hero__grid {
  opacity: .2;
  background-image:
    linear-gradient(rgba(44, 37, 36, .12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(44, 37, 36, .12) 1px, transparent 1px);
}

.portfolio-hero--light .portfolio-hero__identity p,
.portfolio-hero--light .portfolio-hero__identity p span { color: var(--wine); }
.portfolio-hero--light .portfolio-hero__summary { color: var(--text-secondary); }
.portfolio-hero--light .portfolio-hero__cta { border-color: var(--wine); background: var(--wine); color: #ffffff; }
.portfolio-hero--light .portfolio-hero__controls > button { border-color: rgba(128, 20, 24, .25); background: rgba(255, 255, 255, .72); color: var(--wine); }
.portfolio-hero--light .portfolio-hero__controls > button:hover { background: var(--wine); color: #ffffff; }
.portfolio-hero--light .portfolio-hero__pagination button { color: rgba(44, 37, 36, .58); }
.portfolio-hero--light .portfolio-hero__pagination button span,
.portfolio-hero--light .portfolio-hero__pagination button.is-active { color: var(--wine); }
.portfolio-hero--light .portfolio-hero__pagination button i { background: rgba(44, 37, 36, .16); }
.portfolio-hero--light .portfolio-hero__pagination button i::after { background: var(--wine); }

.portfolio-hero--light .portfolio-hero__pagination {
  padding: .15rem .8rem .35rem;
  background: rgba(255, 255, 255, .58);
  backdrop-filter: blur(9px);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes hero-image-drift { from { transform: scale(1.075); } to { transform: scale(1.015); } }
@keyframes hero-content-in { from { opacity: 0; transform: translateY(2rem); } to { opacity: 1; transform: translateY(0); } }
@keyframes hero-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

@media (max-width: 900px) {
  .portfolio-hero__inner { align-items: flex-start; padding-top: 9.5rem; }
  .portfolio-hero__pagination button strong { display: none; }
  .portfolio-hero__pagination { gap: .45rem; }
  .portfolio-hero__pagination button { display: block; }
  .portfolio-hero--light .portfolio-hero__overlay {
    background: rgba(255, 255, 255, .72);
  }
}

@media (max-width: 600px) {
  .portfolio-hero,
  .portfolio-hero__swiper,
  .portfolio-hero :deep(.swiper-wrapper),
  .portfolio-hero :deep(.swiper-slide),
  .portfolio-hero__inner { min-height: max(45rem, 100svh); }
  .portfolio-hero__inner { width: calc(100% - 2.5rem); padding-top: 8rem; padding-bottom: 9rem; }
  .portfolio-hero__identity { align-items: flex-start; flex-direction: column; gap: .8rem; }
  .portfolio-hero__logo { width: 7.5rem; height: 3.7rem; }
  .portfolio-hero h1 { font-size: clamp(3.1rem, 14vw, 4.8rem); }
  .portfolio-hero__summary { margin-top: 1.25rem; font-size: .84rem; }
  .portfolio-hero__cta { margin-top: 1.5rem; }
  .portfolio-hero__controls { right: 1.25rem; bottom: 1.4rem; left: 1.25rem; grid-template-columns: 2.7rem 1fr 2.7rem; gap: .65rem; }
  .portfolio-hero__controls > button { width: 2.7rem; height: 2.7rem; }
}

@media (prefers-reduced-motion: reduce) {
  .portfolio-hero__background,
  .portfolio-hero__identity,
  .portfolio-hero h1,
  .portfolio-hero__summary,
  .portfolio-hero__cta,
  .portfolio-hero__pagination button.is-active i::after { animation: none !important; }
}
</style>
