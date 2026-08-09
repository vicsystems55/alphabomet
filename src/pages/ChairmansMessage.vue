<template>
  <div class="chairman-page">
    <PageHero
      eyebrow="Chairman's Message"
      title="Think global. Build strategically. Create impact."
      summary="A message from Alphabomet Holdings' Founder and Group Chief Executive Officer on purposeful leadership, enterprise development and Africa's global potential."
      index="01"
      :image="aboutImage"
    />

    <section class="chairman-page__letter">
      <img :src="treeArt" alt="" aria-hidden="true" />
      <aside>
        <div v-if="chairmanImage" class="chairman-page__portrait">
          <img :src="chairmanImage" :alt="`${chairmanProfile.name}, ${chairmanProfile.title}`" />
          <span aria-hidden="true"></span>
        </div>
        <p class="eyebrow">Founder &amp; Group CEO</p>
        <blockquote>&ldquo;{{ chairmanProfile.motto }}&rdquo;</blockquote>
        <div>
          <strong>{{ chairmanProfile.name }}</strong>
          <span>{{ chairmanProfile.title }} &mdash; Alphabomet Holdings</span>
        </div>
      </aside>

      <article>
        <p v-for="paragraph in chairmansForeword" :key="paragraph">{{ paragraph }}</p>
      </article>
    </section>

    <section class="chairman-page__profile">
      <div class="chairman-page__profile-heading">
        <div>
          <p class="eyebrow">Executive profile</p>
          <h2>Leadership shaped by multidisciplinary experience.</h2>
        </div>
        <div class="chairman-page__descriptors" aria-label="Leadership attributes">
          <span v-for="descriptor in chairmanProfile.descriptors" :key="descriptor">
            {{ descriptor }}
          </span>
        </div>
      </div>

      <div class="chairman-page__biography">
        <p v-for="paragraph in chairmanProfile.biography" :key="paragraph">{{ paragraph }}</p>
      </div>

      <div class="chairman-page__credentials">
        <article v-for="(item, index) in chairmanProfile.education" :key="item.label">
          <span>0{{ index + 1 }} / {{ item.label }}</span>
          <h3>{{ item.value }}</h3>
        </article>
      </div>

      <div class="chairman-page__networks">
        <div>
          <p class="eyebrow">Professional affiliations</p>
          <ul>
            <li v-for="item in chairmanProfile.affiliations" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div>
          <p class="eyebrow">Areas of interest</p>
          <div class="chairman-page__interests">
            <span v-for="item in chairmanProfile.interests" :key="item">{{ item }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="chairman-page__commitments">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Leadership philosophy</p>
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
      <h2>A technology-driven African group built for global competitiveness.</h2>
      <RouterLink to="/about/our-vision-and-mission" class="button-gold">
        Vision &amp; mission <ArrowRight :size="18" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight } from "@lucide/vue";
import { useHead } from "@unhead/vue";
import PageHero from "../components/shared/PageHero.vue";
import { chairmanProfile, chairmansForeword } from "../data/aboutContent";
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
  "Vision and strategic execution",
  "Integrity and responsible leadership",
  "Talent development and innovation",
  "Measurable economic and societal impact",
];

useHead({
  title: "Wahab Suyiti, MBA | Chairman's Message | Alphabomet Holdings",
  meta: [
    {
      name: "description",
      content:
        "Meet Wahab Suyiti, Founder and Group Chief Executive Officer of Alphabomet Holdings, and explore his leadership vision for a globally competitive African corporate group.",
    },
  ],
});
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

.chairman-page__letter aside {
  align-self: start;
  padding: 2.2rem;
  border-top: 3px solid var(--heading-color);
  background: var(--surface-secondary);
}

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

.chairman-page__letter blockquote {
  margin: 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: clamp(1.65rem, 2.7vw, 2.4rem);
  line-height: 1.18;
}

.chairman-page__letter aside > div:last-child {
  margin-top: 2.5rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--border-subtle);
}

.chairman-page__letter aside strong,
.chairman-page__letter aside span { display: block; }
.chairman-page__letter aside strong { color: var(--heading-color); font-family: var(--font-heading); font-size: 1.25rem; }
.chairman-page__letter aside span { max-width: 21rem; margin-top: .35rem; color: var(--text-tertiary); font-size: .62rem; letter-spacing: .08em; line-height: 1.55; text-transform: uppercase; }

.chairman-page__letter article p { margin: 0; color: var(--text-secondary); font-size: 1rem; line-height: 1.95; }
.chairman-page__letter article p + p { margin-top: 1.4rem; }
.chairman-page__letter article p:first-child::first-letter { float: left; margin: .05rem .55rem 0 0; color: var(--heading-color); font-family: var(--font-heading); font-size: 4.2rem; line-height: .8; }

.chairman-page__profile {
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  background: var(--surface-primary);
}

.chairman-page__profile-heading {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: clamp(3rem, 8vw, 8rem);
  align-items: end;
}

.chairman-page__profile h2,
.chairman-page__commitments h2 {
  margin: 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: clamp(2.7rem, 5vw, 4.7rem);
  font-weight: 600;
  line-height: 1;
}

.chairman-page__descriptors,
.chairman-page__interests {
  display: flex;
  flex-wrap: wrap;
  gap: .55rem;
}

.chairman-page__descriptors span,
.chairman-page__interests span {
  padding: .7rem .85rem;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: .62rem;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.chairman-page__biography {
  columns: 2;
  column-gap: clamp(3rem, 7vw, 7rem);
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border-subtle);
}

.chairman-page__biography p {
  break-inside: avoid;
  margin: 0 0 1.35rem;
  color: var(--text-secondary);
  line-height: 1.9;
}

.chairman-page__credentials {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 4rem;
  border-top: 1px solid var(--border-subtle);
  border-left: 1px solid var(--border-subtle);
}

.chairman-page__credentials article {
  min-height: 14rem;
  padding: 1.4rem;
  border-right: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.chairman-page__credentials span,
.chairman-page__commitments article span {
  color: color-mix(in srgb, var(--heading-color) 48%, transparent);
  font-size: .56rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.chairman-page__credentials h3 {
  margin: 4rem 0 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: 1.2rem;
  line-height: 1.22;
}

.chairman-page__networks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem, 8vw, 8rem);
  margin-top: 5rem;
}

.chairman-page__networks ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.chairman-page__networks li {
  padding: .9rem 0;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: .78rem;
  line-height: 1.55;
}

.chairman-page__commitments {
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  background: var(--surface-secondary);
}

.chairman-page__commitments > div:last-child {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--border-subtle);
  border-left: 1px solid var(--border-subtle);
}

.chairman-page__commitments article {
  min-height: 13rem;
  padding: 1.5rem;
  border-right: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.chairman-page__commitments article h3 {
  margin: 4rem 0 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: 1.45rem;
  line-height: 1.1;
}

@media (max-width: 1000px) {
  .chairman-page__credentials { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 760px) {
  .chairman-page__letter,
  .chairman-page__profile-heading,
  .chairman-page__networks { grid-template-columns: 1fr; }
  .chairman-page__letter,
  .chairman-page__profile,
  .chairman-page__commitments { padding: 5rem 1.25rem; }
  .chairman-page__biography { columns: 1; }
  .chairman-page__credentials { grid-template-columns: 1fr 1fr; }
  .chairman-page__commitments > div:last-child { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .chairman-page__credentials { grid-template-columns: 1fr; }
}
</style>
