<template>
  <section class="globe-hero">
    <div
      class="globe-hero__background"
      :style="{ backgroundImage: `url(${globeImage})` }"
      aria-hidden="true"
    ></div>
    <div class="globe-hero__shade" aria-hidden="true"></div>
    <div class="globe-hero__accent" aria-hidden="true"></div>

    <div class="globe-hero__inner">
      <div class="globe-hero__content">
        <p class="globe-hero__kicker">African-led. Globally positioned.</p>
        <h1>
          Building Enterprises<br />
          That Power <em>Economies</em>
        </h1>
        <p class="globe-hero__summary">
          We build and invest in transformative businesses that drive sustainable
          growth, create value, and shape a better future across Africa and beyond.
        </p>

        <div class="globe-hero__actions">
          <RouterLink to="/businesses" class="globe-hero__primary">
            Discover our ecosystem <ArrowRight :size="17" />
          </RouterLink>
          <RouterLink to="/investors/strategy-2026-2028" class="globe-hero__secondary">
            Our strategy 2026–2028 <ArrowRight :size="17" />
          </RouterLink>
        </div>
      </div>

      <div class="globe-hero__metrics">
        <article v-for="metric in metrics" :key="metric.title">
          <div class="globe-hero__metric-icon">
            <component :is="metric.icon" :size="21" stroke-width="1.5" />
          </div>
          <div>
            <strong>{{ metric.value }}</strong>
            <h2>{{ metric.title }}</h2>
            <p>{{ metric.detail }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Globe2,
  ShieldCheck,
} from "@lucide/vue";
import globeImage from "../../assets/images/globe.png";

const metrics = [
  {
    icon: Building2,
    value: "16",
    title: "Companies",
    detail: "Across key sectors",
  },
  {
    icon: CalendarDays,
    value: "2026",
    title: "Strategic growth",
    detail: "Framework",
  },
  {
    icon: Globe2,
    value: "West Africa",
    title: "Regional focus",
    detail: "Global vision",
  },
  {
    icon: ShieldCheck,
    value: "ESG",
    title: "Integrated",
    detail: "Governance",
  },
];
</script>

<style scoped>
.globe-hero {
  position: relative;
  min-height: max(48rem, 100svh);
  overflow: hidden;
  background: #030303;
  color: #f8f4ee;
}

.globe-hero__background,
.globe-hero__shade,
.globe-hero__accent {
  position: absolute;
  inset: 0;
}

.globe-hero__background {
  background-position: center;
  background-size: cover;
  transform: scale(1.015);
  animation: globe-arrive 2.2s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.globe-hero__shade {
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.88) 23%, rgba(0, 0, 0, 0.28) 56%, rgba(0, 0, 0, 0.08) 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.82) 0%, transparent 43%);
}

.globe-hero__accent {
  opacity: 0.32;
  background-image: radial-gradient(rgba(220, 193, 144, 0.55) 0.65px, transparent 0.65px);
  background-position: 2rem 8rem;
  background-size: 0.55rem 0.55rem;
  mask-image: linear-gradient(90deg, black, transparent 32%);
}

.globe-hero__inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: min(100% - 3rem, 82rem);
  min-height: max(48rem, 100svh);
  margin: 0 auto;
  padding: 8.5rem 0 11.5rem;
}

.globe-hero__content {
  max-width: 47rem;
  animation: content-arrive 1s 0.15s ease both;
}

.globe-hero__kicker {
  margin: 0 0 1.2rem;
  color: #dcc190;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.globe-hero h1 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(3.65rem, 6.2vw, 6.35rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 0.89;
  text-wrap: balance;
}

.globe-hero h1 em {
  color: #dcc190;
  font-style: normal;
}

.globe-hero__summary {
  max-width: 36rem;
  margin: 1.7rem 0 0;
  color: rgba(248, 244, 238, 0.72);
  font-size: 0.92rem;
  line-height: 1.8;
}

.globe-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2rem;
}

.globe-hero__primary,
.globe-hero__secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 3.4rem;
  padding: 0 1.35rem;
  border: 1px solid #dcc190;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: 220ms ease;
}

.globe-hero__primary {
  background: #dcc190;
  color: #3f080b;
}

.globe-hero__secondary {
  background: rgba(0, 0, 0, 0.38);
  color: #dcc190;
  backdrop-filter: blur(8px);
}

.globe-hero__primary:hover,
.globe-hero__secondary:hover {
  background: #f2d794;
  color: #3f080b;
  transform: translateY(-2px);
}

.globe-hero__metrics {
  position: absolute;
  right: 0;
  bottom: 2.2rem;
  left: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 1.25rem 0;
  border: 1px solid rgba(220, 193, 144, 0.18);
  border-radius: 0.65rem;
  background: rgba(7, 5, 4, 0.79);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(18px);
  animation: metrics-arrive 1s 0.4s ease both;
}

.globe-hero__metrics article {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 4.3rem;
  padding: 0 1.6rem;
  border-right: 1px solid rgba(220, 193, 144, 0.13);
}

.globe-hero__metrics article:last-child {
  border-right: 0;
}

.globe-hero__metric-icon {
  display: grid;
  flex: none;
  width: 2.8rem;
  height: 2.8rem;
  place-items: center;
  border: 1px solid rgba(220, 193, 144, 0.45);
  border-radius: 50%;
  color: #dcc190;
}

.globe-hero__metrics strong {
  display: block;
  color: #dcc190;
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1;
}

.globe-hero__metrics h2 {
  margin: 0.38rem 0 0;
  color: #f8f4ee;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.globe-hero__metrics p {
  margin: 0.22rem 0 0;
  color: rgba(248, 244, 238, 0.5);
  font-size: 0.58rem;
  line-height: 1.35;
  text-transform: capitalize;
}

@keyframes globe-arrive {
  from { opacity: 0.25; transform: scale(1.08); }
  to { opacity: 1; transform: scale(1.015); }
}

@keyframes content-arrive {
  from { opacity: 0; transform: translateY(1.6rem); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes metrics-arrive {
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .globe-hero__background {
    background-position: 61% center;
  }

  .globe-hero__shade {
    background:
      linear-gradient(90deg, rgba(0, 0, 0, 0.96), rgba(0, 0, 0, 0.58) 70%, rgba(0, 0, 0, 0.35)),
      linear-gradient(0deg, rgba(0, 0, 0, 0.9), transparent 55%);
  }

  .globe-hero__inner {
    justify-content: flex-start;
    padding-top: 9.5rem;
    padding-bottom: 15rem;
  }

  .globe-hero__metrics {
    grid-template-columns: repeat(2, 1fr);
  }

  .globe-hero__metrics article:nth-child(2) {
    border-right: 0;
  }

  .globe-hero__metrics article:nth-child(-n+2) {
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(220, 193, 144, 0.13);
  }

  .globe-hero__metrics article:nth-child(n+3) {
    padding-top: 1rem;
  }
}

@media (max-width: 600px) {
  .globe-hero {
    min-height: auto;
  }

  .globe-hero__background {
    background-position: 63% top;
  }

  .globe-hero__inner {
    width: calc(100% - 2.5rem);
    min-height: 53rem;
    padding: 8.5rem 0 16rem;
  }

  .globe-hero h1 {
    font-size: clamp(3.15rem, 14vw, 4.4rem);
  }

  .globe-hero__summary {
    font-size: 0.82rem;
  }

  .globe-hero__actions {
    align-items: stretch;
    flex-direction: column;
  }

  .globe-hero__primary,
  .globe-hero__secondary {
    width: 100%;
  }

  .globe-hero__metrics {
    bottom: 1.25rem;
  }

  .globe-hero__metrics article {
    gap: 0.7rem;
    padding-right: 0.7rem;
    padding-left: 0.7rem;
  }

  .globe-hero__metric-icon {
    width: 2.25rem;
    height: 2.25rem;
  }

  .globe-hero__metrics strong {
    font-size: 1.05rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .globe-hero__background,
  .globe-hero__content,
  .globe-hero__metrics {
    animation: none;
  }
}
</style>
