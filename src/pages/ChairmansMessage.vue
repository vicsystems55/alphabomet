<template>
  <div class="chairman-page">
    <section class="chairman-page__message" aria-labelledby="chairman-message-title">
      <div class="chairman-page__portrait-stage" aria-hidden="true">
        <img :src="chairmanImage" alt="" />
      </div>
      <div class="chairman-page__atmosphere" aria-hidden="true"></div>

      <div class="chairman-page__message-shell">
        <div class="chairman-page__message-topbar">
          <nav aria-label="Breadcrumb">
            <RouterLink to="/">Home</RouterLink>
            <ChevronRight :size="13" />
            <RouterLink to="/about">About</RouterLink>
            <ChevronRight :size="13" />
            <span>Chairman's Message</span>
          </nav>
          <img :src="logoWhite" alt="Alphabomet Holdings" />
        </div>

        <header class="chairman-page__message-intro">
          <p>Chairman's Message <span>/ 2026</span></p>
          <h1 id="chairman-message-title">
            Think global.<br />
            Build strategically.<br />
            <span>Create impact.</span>
          </h1>
          <p>
            A perspective on purposeful leadership, enterprise development and
            Africa's place in the global economy.
          </p>
        </header>

        <article class="chairman-page__message-letter">
          <header>
            <p>From the Founder &amp; Group Chief Executive Officer</p>
            <h2>Building enterprises that create lasting value.</h2>
          </header>

          <div class="chairman-page__message-copy">
            <p v-for="paragraph in chairmansForeword" :key="paragraph">{{ paragraph }}</p>
          </div>

          <footer>
            <blockquote>&ldquo;{{ chairmanProfile.motto }}&rdquo;</blockquote>
            <div>
              <strong>{{ chairmanProfile.name }}</strong>
              <span>{{ chairmanProfile.title }}</span>
              <span>Alphabomet Holdings</span>
            </div>
          </footer>
        </article>
      </div>
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

    <section class="page-cta chairman-page__cta">
      <p class="eyebrow">Our ambition</p>
      <h2>A technology-driven African group built for global competitiveness.</h2>
      <RouterLink to="/about/our-vision-and-mission" class="button-gold">
        Vision &amp; mission <ArrowRight :size="18" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight, ChevronRight } from "@lucide/vue";
import { useHead } from "@unhead/vue";
import { chairmanProfile, chairmansForeword } from "../data/aboutContent";
import chairmanImage from "../assets/images/chairman.jpg";
import logoWhite from "../assets/images/logo-white.png";

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
.chairman-page {
  background: #050505;
  color: #ffffff;
}

.chairman-page__message {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: #030303;
  color: #ffffff;
}

.chairman-page__portrait-stage {
  position: absolute;
  inset: 0 0 auto;
  z-index: 0;
  height: min(84rem, 120svh);
  overflow: hidden;
  pointer-events: none;
}

.chairman-page__portrait-stage img {
  position: absolute;
  top: 4.5rem;
  left: 50%;
  display: block;
  width: min(62rem, 100vw);
  max-width: none;
  height: auto;
  filter: grayscale(1) contrast(1.08) brightness(.88);
  transform: translateX(-50%);
}

.chairman-page__portrait-stage::before,
.chairman-page__portrait-stage::after {
  position: absolute;
  inset: 0;
  z-index: 1;
  content: "";
}

.chairman-page__portrait-stage::before {
  background: linear-gradient(
    90deg,
    #030303 0%,
    rgba(3, 3, 3, .94) 9%,
    rgba(3, 3, 3, .25) 38%,
    rgba(3, 3, 3, .12) 62%,
    rgba(3, 3, 3, .92) 92%,
    #030303 100%
  );
}

.chairman-page__portrait-stage::after {
  background: linear-gradient(
    0deg,
    #030303 0%,
    rgba(3, 3, 3, .98) 10%,
    rgba(3, 3, 3, .58) 29%,
    transparent 58%,
    rgba(3, 3, 3, .35) 100%
  );
}

.chairman-page__atmosphere {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(circle at 72% 24%, rgba(255, 255, 255, .055), transparent 24%),
    linear-gradient(90deg, rgba(255, 255, 255, .018) 1px, transparent 1px);
  background-size: auto, 6rem 100%;
  mask-image: linear-gradient(180deg, black, transparent 76%);
}

.chairman-page__message-shell {
  position: relative;
  z-index: 2;
  width: min(100% - 3rem, 82rem);
  margin: 0 auto;
  padding: 8rem 0 7.5rem;
}

.chairman-page__message-topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
}

.chairman-page__message-topbar nav {
  display: flex;
  align-items: center;
  gap: .4rem;
  color: rgba(255, 255, 255, .52);
  font-size: .64rem;
  letter-spacing: .08em;
}

.chairman-page__message-topbar nav a {
  transition: color 180ms ease;
}

.chairman-page__message-topbar nav a:hover { color: #ffffff; }

.chairman-page__message-topbar > img {
  width: clamp(9.5rem, 15vw, 13.5rem);
  height: auto;
  opacity: .92;
}

.chairman-page__message-intro {
  max-width: 38rem;
  margin-top: clamp(5.5rem, 9vw, 9rem);
}

.chairman-page__message-intro > p:first-child,
.chairman-page__message-letter > header p {
  margin: 0 0 1.25rem;
  color: #ffffff;
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .2em;
  text-transform: uppercase;
}

.chairman-page__message-intro > p:first-child span {
  color: rgba(255, 255, 255, .48);
}

.chairman-page__message-intro h1 {
  margin: 0;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: clamp(4.2rem, 7.4vw, 7.4rem);
  font-weight: 500;
  letter-spacing: -.045em;
  line-height: .86;
  text-wrap: balance;
}

.chairman-page__message-intro h1 span {
  color: #ffffff;
  font-style: italic;
  font-weight: 400;
}

.chairman-page__message-intro > p:last-child {
  max-width: 33rem;
  margin: 2rem 0 0;
  color: rgba(255, 255, 255, .68);
  font-size: 1rem;
  line-height: 1.8;
}

.chairman-page__message-letter {
  width: min(100%, 64rem);
  margin: clamp(8rem, 14vw, 13rem) auto 0;
}

.chairman-page__message-letter > header {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, .28);
  text-align: center;
}

.chairman-page__message-letter > header h2 {
  max-width: 49rem;
  margin: 0 auto;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: clamp(2.8rem, 5vw, 4.8rem);
  font-weight: 500;
  letter-spacing: -.035em;
  line-height: .98;
}

.chairman-page__message-copy {
  margin-top: 3.5rem;
}

.chairman-page__message-copy p {
  margin: 0;
  color: rgba(255, 255, 255, .83);
  font-size: clamp(.97rem, 1.15vw, 1.06rem);
  line-height: 1.9;
}

.chairman-page__message-copy p + p { margin-top: 1.5rem; }

.chairman-page__message-copy p:first-child::first-letter {
  float: left;
  margin: .12rem .65rem 0 0;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 5rem;
  line-height: .68;
}

.chairman-page__message-letter footer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 3rem;
  align-items: end;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, .2);
}

.chairman-page__message-letter blockquote {
  max-width: 40rem;
  margin: 0;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 3vw, 2.7rem);
  font-style: italic;
  line-height: 1.12;
}

.chairman-page__message-letter footer > div {
  min-width: 15rem;
  text-align: right;
}

.chairman-page__message-letter footer strong,
.chairman-page__message-letter footer span {
  display: block;
  color: #ffffff;
}

.chairman-page__message-letter footer strong {
  font-family: var(--font-heading);
  font-size: 1.35rem;
}

.chairman-page__message-letter footer span {
  margin-top: .28rem;
  color: rgba(255, 255, 255, .6);
  font-size: .6rem;
  letter-spacing: .1em;
  line-height: 1.4;
  text-transform: uppercase;
}

.chairman-page__profile {
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  border-top: 1px solid rgba(255, 255, 255, .1);
  background: #080808;
  color: #ffffff;
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
  color: #ffffff;
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
  border: 1px solid rgba(255, 255, 255, .16);
  color: rgba(255, 255, 255, .72);
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
  border-top: 1px solid rgba(255, 255, 255, .13);
}

.chairman-page__biography p {
  break-inside: avoid;
  margin: 0 0 1.35rem;
  color: rgba(255, 255, 255, .7);
  line-height: 1.9;
}

.chairman-page__credentials {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, .13);
  border-left: 1px solid rgba(255, 255, 255, .13);
}

.chairman-page__credentials article {
  min-height: 14rem;
  padding: 1.4rem;
  border-right: 1px solid rgba(255, 255, 255, .13);
  border-bottom: 1px solid rgba(255, 255, 255, .13);
  background: rgba(255, 255, 255, .018);
}

.chairman-page__credentials span,
.chairman-page__commitments article span {
  color: rgba(255, 255, 255, .46);
  font-size: .56rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.chairman-page__credentials h3 {
  margin: 4rem 0 0;
  color: #ffffff;
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
  border-bottom: 1px solid rgba(255, 255, 255, .12);
  color: rgba(255, 255, 255, .68);
  font-size: .78rem;
  line-height: 1.55;
}

.chairman-page__commitments {
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  border-top: 1px solid rgba(255, 255, 255, .08);
  background: #0c0c0c;
  color: #ffffff;
}

.chairman-page__commitments > div:last-child {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgba(255, 255, 255, .13);
  border-left: 1px solid rgba(255, 255, 255, .13);
}

.chairman-page__commitments article {
  min-height: 13rem;
  padding: 1.5rem;
  border-right: 1px solid rgba(255, 255, 255, .13);
  border-bottom: 1px solid rgba(255, 255, 255, .13);
}

.chairman-page__commitments article h3 {
  margin: 4rem 0 0;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.45rem;
  line-height: 1.1;
}

.chairman-page .eyebrow,
.chairman-page .section-heading > p {
  color: rgba(255, 255, 255, .62);
}

.chairman-page .chairman-page__cta {
  border-top: 1px solid rgba(255, 255, 255, .09);
  background:
    radial-gradient(circle at center top, rgba(255, 255, 255, .06), transparent 36%),
    #050505;
  color: #ffffff;
}

.chairman-page .chairman-page__cta .eyebrow,
.chairman-page .chairman-page__cta h2 { color: #ffffff; }

.chairman-page .chairman-page__cta .button-gold {
  border-color: rgba(255, 255, 255, .28);
  background: #801418;
  color: #ffffff;
}

.chairman-page .chairman-page__cta .button-gold:hover {
  border-color: #ffffff;
  background: #ffffff;
  color: #111111;
}

@media (max-width: 1000px) {
  .chairman-page__credentials { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 760px) {
  .chairman-page__profile-heading,
  .chairman-page__networks { grid-template-columns: 1fr; }
  .chairman-page__profile,
  .chairman-page__commitments { padding: 5rem 1.25rem; }
  .chairman-page__message-shell { width: calc(100% - 2.5rem); padding-top: 7.5rem; padding-bottom: 5.5rem; }
  .chairman-page__message-topbar { align-items: center; }
  .chairman-page__message-topbar > img { width: 9.5rem; }
  .chairman-page__portrait-stage { height: 68rem; }
  .chairman-page__portrait-stage img { top: 5.2rem; left: 58%; width: min(53rem, 145vw); }
  .chairman-page__portrait-stage::before {
    background: linear-gradient(90deg, rgba(3, 3, 3, .86), rgba(3, 3, 3, .25) 55%, rgba(3, 3, 3, .76));
  }
  .chairman-page__message-intro { max-width: 31rem; margin-top: 5rem; }
  .chairman-page__message-intro h1 { font-size: clamp(3.6rem, 13vw, 5.5rem); }
  .chairman-page__message-letter { margin-top: clamp(8rem, 22vw, 11rem); }
  .chairman-page__message-letter footer { grid-template-columns: 1fr; align-items: start; }
  .chairman-page__message-letter footer > div { text-align: left; }
  .chairman-page__biography { columns: 1; }
  .chairman-page__credentials { grid-template-columns: 1fr 1fr; }
  .chairman-page__commitments > div:last-child { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .chairman-page__message-topbar nav a,
  .chairman-page__message-topbar nav svg { display: none; }
  .chairman-page__message-topbar > img { width: 8.5rem; }
  .chairman-page__portrait-stage img { left: 59%; width: 160vw; }
  .chairman-page__message-intro h1 { font-size: clamp(3.2rem, 15vw, 4.4rem); }
  .chairman-page__message-intro > p:last-child { font-size: .9rem; }
  .chairman-page__message-letter { margin-top: 7rem; }
  .chairman-page__message-letter > header h2 { font-size: 2.55rem; }
  .chairman-page__message-copy p { font-size: .95rem; line-height: 1.82; }
  .chairman-page__message-copy p:first-child::first-letter { font-size: 4.2rem; }
  .chairman-page__credentials { grid-template-columns: 1fr; }
  .chairman-page__commitments > div:last-child { grid-template-columns: 1fr; }
}
</style>
