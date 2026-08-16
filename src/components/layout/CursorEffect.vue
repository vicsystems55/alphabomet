<template>
  <div
    v-if="enabled"
    class="cursor-effect"
    :class="{
      'cursor-effect--visible': visible,
      'cursor-effect--interactive': interactive,
      'cursor-effect--pressed': pressed,
    }"
    aria-hidden="true"
  >
    <span ref="ring" class="cursor-effect__ring"></span>
    <span ref="dot" class="cursor-effect__dot"></span>
  </div>

  <div v-if="enabled" class="cursor-ripples" aria-hidden="true">
    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="cursor-ripple"
      :style="{ left: `${ripple.x}px`, top: `${ripple.y}px` }"
    ></span>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const ring = ref(null);
const dot = ref(null);
const enabled = ref(false);
const visible = ref(false);
const interactive = ref(false);
const pressed = ref(false);
const ripples = ref([]);

const target = { x: 0, y: 0 };
const current = { x: 0, y: 0 };
const rippleTimers = new Set();
let pointerQuery;
let motionQuery;
let animationFrame;
let rippleId = 0;

const interactiveSelector = [
  "a",
  "button",
  "input",
  "select",
  "textarea",
  "summary",
  "[role='button']",
  "[data-cursor='interactive']",
].join(",");

const updateAvailability = () => {
  enabled.value = pointerQuery.matches && !motionQuery.matches;
  if (!enabled.value) visible.value = false;
};

const moveCursor = (event) => {
  if (!enabled.value || event.pointerType === "touch") return;

  target.x = event.clientX;
  target.y = event.clientY;

  if (!visible.value) {
    current.x = target.x;
    current.y = target.y;
  }

  visible.value = true;
  interactive.value = Boolean(event.target?.closest?.(interactiveSelector));

  if (dot.value) {
    dot.value.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
  }
};

const animateRing = () => {
  current.x += (target.x - current.x) * 0.17;
  current.y += (target.y - current.y) * 0.17;

  if (ring.value) {
    ring.value.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
  }

  animationFrame = window.requestAnimationFrame(animateRing);
};

const createRipple = (event) => {
  if (!enabled.value || event.pointerType === "touch" || event.button !== 0) return;

  pressed.value = true;
  const id = ++rippleId;
  ripples.value.push({ id, x: event.clientX, y: event.clientY });

  const timer = window.setTimeout(() => {
    ripples.value = ripples.value.filter((ripple) => ripple.id !== id);
    rippleTimers.delete(timer);
  }, 720);

  rippleTimers.add(timer);
};

const releaseCursor = () => {
  pressed.value = false;
};

const hideCursor = () => {
  visible.value = false;
  interactive.value = false;
  pressed.value = false;
};

onMounted(() => {
  pointerQuery = window.matchMedia("(any-pointer: fine)");
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  updateAvailability();

  pointerQuery.addEventListener("change", updateAvailability);
  motionQuery.addEventListener("change", updateAvailability);
  window.addEventListener("pointermove", moveCursor, { passive: true });
  window.addEventListener("pointerdown", createRipple, { passive: true });
  window.addEventListener("pointerup", releaseCursor, { passive: true });
  window.addEventListener("pointercancel", releaseCursor, { passive: true });
  window.addEventListener("blur", hideCursor);
  document.documentElement.addEventListener("mouseleave", hideCursor);
  animationFrame = window.requestAnimationFrame(animateRing);
});

onBeforeUnmount(() => {
  pointerQuery?.removeEventListener("change", updateAvailability);
  motionQuery?.removeEventListener("change", updateAvailability);
  window.removeEventListener("pointermove", moveCursor);
  window.removeEventListener("pointerdown", createRipple);
  window.removeEventListener("pointerup", releaseCursor);
  window.removeEventListener("pointercancel", releaseCursor);
  window.removeEventListener("blur", hideCursor);
  document.documentElement.removeEventListener("mouseleave", hideCursor);
  window.cancelAnimationFrame(animationFrame);
  rippleTimers.forEach((timer) => window.clearTimeout(timer));
});
</script>

<style scoped>
.cursor-effect,
.cursor-ripples {
  --cursor-accent: var(--wine);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 260;
  width: 0;
  height: 0;
  overflow: visible;
  background: transparent;
  pointer-events: none;
}

.cursor-effect {
  opacity: 0;
  transition: opacity 180ms ease;
}

.cursor-effect--visible {
  opacity: 1;
}

.cursor-effect__ring,
.cursor-effect__dot {
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  will-change: transform;
}

.cursor-effect__ring {
  width: 2.2rem;
  height: 2.2rem;
  margin: -1.1rem 0 0 -1.1rem;
  border: 1px solid color-mix(in srgb, var(--cursor-accent) 72%, transparent);
  background: color-mix(in srgb, var(--cursor-accent) 4%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--cursor-accent) 7%, transparent);
  transition:
    width 180ms ease,
    height 180ms ease,
    margin 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.cursor-effect__dot {
  width: .3rem;
  height: .3rem;
  margin: -.15rem 0 0 -.15rem;
  background: var(--cursor-accent);
  box-shadow: 0 0 .75rem color-mix(in srgb, var(--cursor-accent) 42%, transparent);
}

.cursor-effect--interactive .cursor-effect__ring {
  width: 3.35rem;
  height: 3.35rem;
  margin: -1.675rem 0 0 -1.675rem;
  border-color: color-mix(in srgb, var(--cursor-accent) 48%, transparent);
  background: color-mix(in srgb, var(--cursor-accent) 10%, transparent);
  box-shadow: 0 0 1.5rem color-mix(in srgb, var(--cursor-accent) 13%, transparent);
}

.cursor-effect--pressed .cursor-effect__ring {
  width: 1.65rem;
  height: 1.65rem;
  margin: -.825rem 0 0 -.825rem;
  background: color-mix(in srgb, var(--cursor-accent) 18%, transparent);
}

.cursor-ripple {
  position: fixed;
  width: 1rem;
  height: 1rem;
  margin: -.5rem 0 0 -.5rem;
  border: 1.5px solid var(--cursor-accent);
  border-radius: 50%;
  box-shadow: 0 0 1rem color-mix(in srgb, var(--cursor-accent) 18%, transparent);
  animation: cursor-ripple 700ms cubic-bezier(.18, .72, .2, 1) forwards;
}

:global(html[data-theme="dark"] .cursor-effect),
:global(html[data-theme="dark"] .cursor-ripples) {
  --cursor-accent: var(--gold);
}

@keyframes cursor-ripple {
  from {
    opacity: .78;
    transform: scale(.35);
  }
  to {
    opacity: 0;
    transform: scale(5.5);
  }
}
</style>
