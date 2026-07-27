<template>
  <Transition name="loader">
    <div
      v-if="visible"
      class="route-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div class="route-loader__glow"></div>
      <div class="route-loader__mark">
        <img :src="logo" alt="" />
      </div>
      <div class="route-loader__line"><span></span></div>
      <p>Shaping boundless opportunities</p>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import logo from "../../assets/images/logo.png";

const router = useRouter();
const visible = ref(true);
let startedAt = Date.now();
let timer;
const minimumDisplayTime = 1800;

const finish = () => {
  const elapsed = Date.now() - startedAt;
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    visible.value = false;
  }, Math.max(0, minimumDisplayTime - elapsed));
};

router.beforeEach(() => {
  startedAt = Date.now();
  window.clearTimeout(timer);
  visible.value = true;
});

router.afterEach(() => {
  requestAnimationFrame(finish);
});

window.addEventListener("load", finish, { once: true });
</script>
