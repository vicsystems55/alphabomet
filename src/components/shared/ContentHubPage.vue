<template>
  <div class="content-hub">
    <PageHero
      :eyebrow="eyebrow"
      :title="title"
      :summary="summary"
      :index="index"
      :image="image"
    >
      <a
        v-if="imageCredit"
        class="content-hub__credit"
        :href="imageCredit.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        Photo: {{ imageCredit.label }} / Unsplash
        <ExternalLink :size="12" aria-hidden="true" />
      </a>
    </PageHero>

    <nav class="content-hub__nav" :aria-label="`${eyebrow} page sections`">
      <div>
        <a v-for="(section, sectionIndex) in sections" :key="section.id" :href="`#${section.id}`">
          <span>{{ String(sectionIndex + 1).padStart(2, "0") }}</span>
          {{ section.label }}
        </a>
      </div>
    </nav>

    <section class="content-hub__intro">
      <div>
        <p class="eyebrow">{{ statementLabel }}</p>
        <h2>{{ statement }}</h2>
      </div>
      <div class="content-hub__intro-copy">
        <p>{{ body }}</p>
        <div v-if="facts.length" class="content-hub__facts">
          <article v-for="fact in facts" :key="fact.label">
            <strong>{{ fact.value }}</strong>
            <span>{{ fact.label }}</span>
          </article>
        </div>
      </div>
    </section>

    <div class="content-hub__sections">
      <section
        v-for="(section, sectionIndex) in sections"
        :id="section.id"
        :key="section.id"
        class="content-hub__section"
      >
        <div class="content-hub__marker" aria-hidden="true">
          <span>{{ String(sectionIndex + 1).padStart(2, "0") }}</span>
          <div><component :is="section.icon" :size="29" stroke-width="1.45" /></div>
        </div>

        <div class="content-hub__section-copy">
          <p class="eyebrow">{{ section.label }}</p>
          <h2>{{ section.title }}</h2>
          <p>{{ section.body }}</p>

          <ul v-if="section.points?.length" class="content-hub__points">
            <li v-for="point in section.points" :key="point">
              <Check :size="15" stroke-width="2" aria-hidden="true" />
              {{ point }}
            </li>
          </ul>

          <div v-if="section.steps?.length" class="content-hub__steps">
            <article v-for="(step, stepIndex) in section.steps" :key="step.title">
              <span>0{{ stepIndex + 1 }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </article>
          </div>

          <div v-if="section.links?.length" class="content-hub__links">
            <RouterLink v-for="link in section.links" :key="link.to" :to="link.to">
              <span>
                <strong>{{ link.label }}</strong>
                <small>{{ link.description }}</small>
              </span>
              <ArrowUpRight :size="17" aria-hidden="true" />
            </RouterLink>
          </div>

          <RouterLink v-if="section.action" :to="section.action.to" class="content-hub__action">
            {{ section.action.label }}
            <ArrowRight :size="17" aria-hidden="true" />
          </RouterLink>
        </div>
      </section>
    </div>

    <section class="page-cta content-hub__cta">
      <p class="eyebrow">{{ ctaEyebrow }}</p>
      <h2>{{ ctaTitle }}</h2>
      <RouterLink :to="ctaPath" class="button-gold">
        {{ ctaLabel }} <ArrowRight :size="18" aria-hidden="true" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight, ArrowUpRight, Check, ExternalLink } from "@lucide/vue";
import PageHero from "./PageHero.vue";

defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  index: { type: String, required: true },
  image: { type: String, required: true },
  imageCredit: { type: Object, default: null },
  statementLabel: { type: String, required: true },
  statement: { type: String, required: true },
  body: { type: String, required: true },
  facts: { type: Array, default: () => [] },
  sections: { type: Array, required: true },
  ctaEyebrow: { type: String, required: true },
  ctaTitle: { type: String, required: true },
  ctaLabel: { type: String, required: true },
  ctaPath: { type: String, required: true },
});
</script>

<style scoped>
.content-hub {
  --hub-accent: color-mix(in srgb, var(--heading-color) 72%, var(--wine));
  background: var(--surface-page);
  color: var(--text-primary);
}

.content-hub__credit {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  margin-top: 1.4rem;
  padding: .45rem .7rem;
  border: 1px solid var(--border-medium);
  background: var(--surface-translucent);
  color: var(--text-secondary);
  font-size: .56rem;
  letter-spacing: .04em;
  backdrop-filter: blur(8px);
  transition: 180ms ease;
}

.content-hub__credit:hover {
  border-color: var(--gold);
  color: var(--heading-color);
}

.content-hub__nav {
  position: sticky;
  top: 5.5rem;
  z-index: 20;
  border-bottom: 1px solid var(--border-subtle);
  background: color-mix(in srgb, var(--surface-primary) 91%, transparent);
  box-shadow: 0 .8rem 2rem color-mix(in srgb, var(--shadow-surface) 34%, transparent);
  backdrop-filter: blur(16px);
}

.content-hub__nav > div {
  display: flex;
  width: min(100% - 3rem, 82rem);
  margin: 0 auto;
  overflow-x: auto;
  scrollbar-width: none;
}

.content-hub__nav > div::-webkit-scrollbar { display: none; }

.content-hub__nav a {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: .55rem;
  min-height: 3.7rem;
  padding: 0 1rem;
  border-left: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: .58rem;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  transition: 180ms ease;
}

.content-hub__nav a:last-child { border-right: 1px solid var(--border-subtle); }
.content-hub__nav a span { color: var(--hub-accent); font-size: .5rem; }
.content-hub__nav a:hover { background: var(--surface-secondary); color: var(--heading-color); }

.content-hub__intro {
  display: grid;
  grid-template-columns: .95fr 1.05fr;
  gap: clamp(3rem, 8vw, 8rem);
  width: min(100% - 3rem, 82rem);
  margin: 0 auto;
  padding: 7rem 0;
}

.content-hub__intro h2,
.content-hub__section h2 {
  margin: 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-weight: 600;
  letter-spacing: -.035em;
}

.content-hub__intro h2 {
  max-width: 38rem;
  font-size: clamp(2.7rem, 5vw, 4.7rem);
  line-height: 1;
}

.content-hub__intro-copy {
  align-self: end;
}

.content-hub__intro-copy > p {
  max-width: 39rem;
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.85;
}

.content-hub__facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 2.4rem;
  border-top: 1px solid var(--border-medium);
  border-left: 1px solid var(--border-medium);
}

.content-hub__facts article {
  min-height: 7rem;
  padding: 1.15rem;
  border-right: 1px solid var(--border-medium);
  border-bottom: 1px solid var(--border-medium);
}

.content-hub__facts strong,
.content-hub__facts span { display: block; }

.content-hub__facts strong {
  color: var(--hub-accent);
  font-family: var(--font-heading);
  font-size: 2rem;
  line-height: 1;
}

.content-hub__facts span {
  margin-top: .75rem;
  color: var(--text-tertiary);
  font-size: .55rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.content-hub__sections {
  border-top: 1px solid var(--border-subtle);
}

.content-hub__section {
  display: grid;
  grid-template-columns: 9rem minmax(0, 1fr);
  gap: clamp(2.5rem, 7vw, 7rem);
  padding: 6.5rem max(1.5rem, calc((100vw - 82rem) / 2));
  border-bottom: 1px solid var(--border-subtle);
  scroll-margin-top: 10rem;
}

.content-hub__section:nth-child(even) {
  background: var(--surface-secondary);
}

.content-hub__marker > span {
  display: block;
  color: var(--text-tertiary);
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .1em;
}

.content-hub__marker > div {
  display: grid;
  width: 4.25rem;
  height: 4.25rem;
  margin-top: 1.25rem;
  place-items: center;
  border-radius: 50%;
  background: var(--wine);
  color: var(--gold);
  box-shadow: 0 1rem 2.4rem rgba(74, 7, 11, .2);
}

.content-hub__section-copy { max-width: 67rem; }

.content-hub__section h2 {
  max-width: 54rem;
  font-size: clamp(2.45rem, 4.5vw, 4.25rem);
  line-height: 1;
}

.content-hub__section-copy > p:not(.eyebrow) {
  max-width: 50rem;
  margin: 1.4rem 0 0;
  color: var(--text-secondary);
  font-size: .98rem;
  line-height: 1.85;
}

.content-hub__points {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .65rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}

.content-hub__points li {
  display: flex;
  align-items: flex-start;
  gap: .65rem;
  min-height: 4.2rem;
  padding: 1rem;
  border: 1px solid var(--border-subtle);
  background: var(--surface-elevated);
  color: var(--text-secondary);
  font-size: .72rem;
  line-height: 1.5;
}

.content-hub__points svg { flex: none; margin-top: .15rem; color: var(--hub-accent); }

.content-hub__steps,
.content-hub__links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 2.25rem;
  border-top: 1px solid var(--border-medium);
  border-left: 1px solid var(--border-medium);
}

.content-hub__steps article {
  min-height: 13rem;
  padding: 1.4rem;
  border-right: 1px solid var(--border-medium);
  border-bottom: 1px solid var(--border-medium);
}

.content-hub__steps span {
  color: var(--hub-accent);
  font-size: .58rem;
  font-weight: 700;
}

.content-hub__steps h3 {
  margin: 2.6rem 0 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: 1.65rem;
}

.content-hub__steps p {
  margin: .7rem 0 0;
  color: var(--text-secondary);
  font-size: .72rem;
  line-height: 1.65;
}

.content-hub__links a {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  min-height: 8rem;
  padding: 1.25rem;
  border-right: 1px solid var(--border-medium);
  border-bottom: 1px solid var(--border-medium);
  color: var(--heading-color);
  transition: 200ms ease;
}

.content-hub__links a:hover {
  background: var(--wine);
  color: var(--cream);
}

.content-hub__links a > span,
.content-hub__links strong,
.content-hub__links small { display: block; }
.content-hub__links strong { font-family: var(--font-heading); font-size: 1.25rem; }
.content-hub__links small { margin-top: .4rem; color: var(--text-tertiary); font-size: .58rem; line-height: 1.45; }
.content-hub__links a:hover small { color: rgba(248, 244, 238, .65); }
.content-hub__links svg { flex: none; color: var(--hub-accent); }
.content-hub__links a:hover svg { color: var(--gold); }

.content-hub__action {
  display: inline-flex;
  align-items: center;
  gap: .65rem;
  margin-top: 2rem;
  color: var(--hub-accent);
  font-size: .66rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.content-hub__action:hover { color: var(--heading-color); }
.content-hub__cta h2 { color: var(--cream); }

@media (max-width: 960px) {
  .content-hub__nav { top: 4.9rem; }
  .content-hub__section { grid-template-columns: 6rem minmax(0, 1fr); }
  .content-hub__points { grid-template-columns: 1fr 1fr; }
  .content-hub__links { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 700px) {
  .content-hub__nav > div { width: 100%; }
  .content-hub__nav a { min-height: 3.35rem; padding: 0 .85rem; }
  .content-hub__intro { grid-template-columns: 1fr; gap: 2rem; width: calc(100% - 2.5rem); padding: 5rem 0; }
  .content-hub__facts { grid-template-columns: 1fr; }
  .content-hub__facts article { min-height: 5.5rem; }
  .content-hub__section { grid-template-columns: 1fr; gap: 2rem; padding: 5rem 1.25rem; scroll-margin-top: 9rem; }
  .content-hub__marker { display: flex; align-items: center; gap: 1rem; }
  .content-hub__marker > div { width: 3.6rem; height: 3.6rem; margin-top: 0; }
  .content-hub__points,
  .content-hub__steps,
  .content-hub__links { grid-template-columns: 1fr; }
  .content-hub__steps article { min-height: 10rem; }
  .content-hub__links a { min-height: 6.5rem; }
}
</style>
