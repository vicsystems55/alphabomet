<template>
  <div class="chairman-page">
    <PageHero
      eyebrow="Chairman's Foreword"
      title="Building businesses that create lasting value."
      summary="A message on Alphabomet's purpose, Africa's potential and the responsibility to build sustainable enterprises for generations to come."
      index="01"
      :image="aboutImage"
    />

    <section class="chairman-page__letter">
      <img :src="treeArt" alt="" aria-hidden="true" />
      <aside>
        <div v-if="chairmanImage" class="chairman-page__portrait">
          <img :src="chairmanImage" alt="Chairman of Alphabomet Holdings" />
          <span aria-hidden="true"></span>
        </div>
        <p class="eyebrow">From the Chairman</p>
        <blockquote>
          “Africa possesses extraordinary potential. Through innovation, strategic
          investment and responsible leadership, we can transform industries, create
          opportunities and improve lives.”
        </blockquote>
        <div>
          <strong>Chairman</strong>
          <span>Alphabomet Holdings</span>
        </div>
      </aside>

      <article>
        <p v-for="paragraph in chairmansForeword" :key="paragraph">{{ paragraph }}</p>
      </article>
    </section>

    <section class="chairman-page__commitments">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Looking forward</p>
          <h2>Enterprise with responsibility.</h2>
        </div>
        <p>Four commitments shaping the Group's long-term direction.</p>
      </div>
      <div>
        <article v-for="(item, index) in commitments" :key="item">
          <span>0{{ index + 1 }}</span>
          <h3>{{ item }}</h3>
        </article>
      </div>
    </section>

    <section class="page-cta">
      <p class="eyebrow">Our ambition</p>
      <h2>Sustainable enterprises that will serve generations to come.</h2>
      <RouterLink to="/about/our-vision-and-mission" class="button-gold">
        Vision & mission <ArrowRight :size="18" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight } from "@lucide/vue";
import PageHero from "../components/shared/PageHero.vue";
import { chairmansForeword } from "../data/aboutContent";
import aboutImage from "../assets/slide-1.png";
import treeArt from "../assets/images/white-tree.png";

const imageAssets = import.meta.glob(
  "../assets/images/*.{jpg,jpeg,png,webp}",
  { eager: true, query: "?url", import: "default" },
);
const chairmanImage = Object.entries(imageAssets).find(([path]) =>
  /\/(?:chariman|chairman)\.(?:jpe?g|png|webp)$/i.test(path),
)?.[1];

const commitments = [
  "Responsible corporate governance",
  "Environmental sustainability",
  "Technological advancement",
  "Inclusive economic development",
];
</script>

<style scoped>
.chairman-page__letter {
  position: relative;
  display: grid;
  grid-template-columns: .75fr 1.25fr;
  gap: clamp(3rem, 8vw, 8rem);
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  overflow: hidden;
  background: var(--surface-primary);
}

.chairman-page__letter > img {
  position: absolute;
  left: -7rem;
  bottom: -8rem;
  width: min(36rem, 48vw);
  opacity: .035;
}

.chairman-page__letter aside,
.chairman-page__letter article { position: relative; z-index: 1; }

.chairman-page__letter aside { align-self: start; padding: 2.2rem; border-top: 3px solid var(--heading-color); background: var(--surface-secondary); }
.chairman-page__portrait {
  position: relative;
  height: clamp(19rem, 33vw, 28rem);
  margin: -2.2rem -2.2rem 2rem;
  overflow: hidden;
  background: var(--wine-deep);
}

.chairman-page__portrait::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(74, 7, 11, .52), transparent 42%);
  content: "";
}

.chairman-page__portrait img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.chairman-page__portrait > span {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 1;
  width: 2.7rem;
  height: 2.7rem;
  border-right: 1px solid var(--gold);
  border-bottom: 1px solid var(--gold);
}
.chairman-page__letter blockquote { margin: 0; color: var(--heading-color); font-family: var(--font-heading); font-size: clamp(1.65rem, 2.7vw, 2.4rem); line-height: 1.18; }
.chairman-page__letter aside > div { margin-top: 2.5rem; padding-top: 1.2rem; border-top: 1px solid var(--border-subtle); }
.chairman-page__letter aside strong,
.chairman-page__letter aside span { display: block; }
.chairman-page__letter aside strong { color: var(--heading-color); font-family: var(--font-heading); font-size: 1.25rem; }
.chairman-page__letter aside span { margin-top: .25rem; color: var(--text-tertiary); font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; }

.chairman-page__letter article p { margin: 0; color: var(--text-secondary); font-size: 1rem; line-height: 1.95; }
.chairman-page__letter article p + p { margin-top: 1.4rem; }
.chairman-page__letter article p:first-child::first-letter { float: left; margin: .05rem .55rem 0 0; color: var(--heading-color); font-family: var(--font-heading); font-size: 4.2rem; line-height: .8; }

.chairman-page__commitments { padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2)); background: var(--surface-secondary); }
.chairman-page__commitments h2 { margin: 0; color: var(--heading-color); font-family: var(--font-heading); font-size: clamp(2.7rem,5vw,4.7rem); font-weight: 600; line-height: 1; }
.chairman-page__commitments > div:last-child { display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid var(--border-subtle); border-left: 1px solid var(--border-subtle); }
.chairman-page__commitments article { min-height: 13rem; padding: 1.5rem; border-right: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); }
.chairman-page__commitments article span { color: rgba(128,20,24,.48); font-size: .6rem; font-weight: 700; }
.chairman-page__commitments article h3 { margin: 4rem 0 0; color: var(--heading-color); font-family: var(--font-heading); font-size: 1.45rem; line-height: 1.1; }

@media (max-width: 760px) {
  .chairman-page__letter { grid-template-columns: 1fr; padding: 5rem 1.25rem; }
  .chairman-page__commitments { padding: 5rem 1.25rem; }
  .chairman-page__commitments > div:last-child { grid-template-columns: repeat(2,1fr); }
}
</style>
