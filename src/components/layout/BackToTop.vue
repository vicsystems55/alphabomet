<template>
  <Transition name="back-to-top">
    <button
      v-if="visible"
      class="back-to-top"
      type="button"
      aria-label="Back to top"
      title="Back to top"
      @click="scrollToTop"
    >
      <ArrowUp :size="20" stroke-width="1.8" />
      <span>Top</span>
    </button>
  </Transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { ArrowUp } from "@lucide/vue";

const visible = ref(false);

const updateVisibility = () => {
  visible.value = window.scrollY > 560;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateVisibility);
});
</script>

<style scoped>
.back-to-top {
  position: fixed;
  right: 1.6rem;
  bottom: 1.6rem;
  z-index: 70;
  display: grid;
  width: 3.4rem;
  height: 3.4rem;
  place-items: center;
  padding: 0.45rem 0 0.35rem;
  border: 1px solid rgba(220, 193, 144, 0.55);
  border-radius: 50%;
  background: rgba(74, 7, 11, 0.9);
  box-shadow: 0 0.9rem 2.5rem rgba(28, 0, 2, 0.3);
  color: #dcc190;
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition: 220ms ease;
}

.back-to-top span {
  margin-top: -0.35rem;
  font-size: 0.48rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  text-transform: uppercase;
}

.back-to-top:hover {
  background: #dcc190;
  color: #4a070b;
  transform: translateY(-0.25rem);
}

.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: opacity 220ms ease, transform 260ms ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(0.8rem) scale(0.88);
}

@media (max-width: 640px) {
  .back-to-top {
    right: 1rem;
    bottom: 1rem;
    width: 3rem;
    height: 3rem;
  }
}
</style>
