<template>
  <div class="site-shell">
    <RoutePreloader />
    <SiteHeader />
    <main>
      <RouterView v-slot="{ Component }">
        <component :is="Component" :key="$route.fullPath" />
      </RouterView>
    </main>
    <BackToTop />
    <SiteFooter />
  </div>
</template>

<script setup>
import RoutePreloader from "../components/layout/RoutePreloader.vue";
import BackToTop from "../components/layout/BackToTop.vue";
import SiteFooter from "../components/layout/SiteFooter.vue";
import SiteHeader from "../components/layout/SiteHeader.vue";
</script>
