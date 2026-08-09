<template>
  <header
    class="site-header"
    :class="{ 'site-header--scrolled': isScrolled, 'site-header--open': mobileOpen }"
  >
    <div class="site-header__inner">
      <RouterLink to="/" class="site-logo" aria-label="Alphabomet home" @click="closeAll">
        <img :src="logo" alt="Alphabomet Holdings" />
      </RouterLink>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <RouterLink to="/" class="desktop-nav__link">Home</RouterLink>

        <div
          v-for="item in navigation"
          :key="item.path"
          class="desktop-nav__item"
          @mouseenter="openMenu = item.path"
          @mouseleave="openMenu = null"
          @focusin="openMenu = item.path"
          @focusout="onFocusOut"
        >
          <RouterLink :to="item.path" class="desktop-nav__link">
            {{ item.label }}
            <ChevronDown :size="13" stroke-width="1.8" />
          </RouterLink>

          <Transition name="dropdown">
            <div
              v-if="openMenu === item.path"
              class="mega-menu"
              :class="{ 'mega-menu--wide': item.featured }"
            >
              <div class="mega-menu__intro">
                <span>Explore</span>
                <h2>{{ item.label }}</h2>
                <p>{{ item.intro }}</p>
                <RouterLink :to="item.path" @click="closeAll">
                  View overview <ArrowUpRight :size="16" />
                </RouterLink>
              </div>

              <div class="mega-menu__links" :class="{ 'mega-menu__links--grid': item.featured }">
                <div v-for="child in item.children" :key="child.path" class="mega-menu__group">
                  <RouterLink :to="child.path" @click="closeAll">
                    {{ child.label }}
                    <ArrowRight :size="14" />
                  </RouterLink>
                  <RouterLink
                    v-for="company in child.children"
                    :key="company.path"
                    :to="company.path"
                    class="mega-menu__company"
                    @click="closeAll"
                  >
                    {{ company.label }}
                  </RouterLink>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </nav>

      <div class="header-actions">
        <ThemeToggle />
        <RouterLink to="/contact/partner-with-us" class="header-cta">
          Partner with us <ArrowUpRight :size="16" />
        </RouterLink>
      </div>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-navigation"
        aria-label="Toggle navigation"
        @click="mobileOpen = !mobileOpen"
      >
        <X v-if="mobileOpen" :size="24" />
        <Menu v-else :size="25" />
      </button>
    </div>

    <Transition name="mobile-menu">
      <nav v-if="mobileOpen" id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation">
        <RouterLink to="/" class="mobile-nav__home" @click="closeAll">Home</RouterLink>

        <div v-for="item in navigation" :key="item.path" class="mobile-nav__section">
          <button type="button" @click="toggleMobileSection(item.path)">
            {{ item.label }}
            <ChevronDown
              :size="18"
              :class="{ 'rotate-180': mobileSection === item.path }"
            />
          </button>
          <div v-if="mobileSection === item.path" class="mobile-nav__children">
            <RouterLink :to="item.path" @click="closeAll">{{ item.label }} overview</RouterLink>
            <template v-for="child in item.children" :key="child.path">
              <RouterLink :to="child.path" @click="closeAll">{{ child.label }}</RouterLink>
              <RouterLink
                v-for="company in child.children"
                :key="company.path"
                :to="company.path"
                class="mobile-nav__company"
                @click="closeAll"
              >
                {{ company.label }}
              </RouterLink>
            </template>
          </div>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "@lucide/vue";
import logo from "../../assets/images/logo.png";
import { navigation } from "../../data/siteNavigation";
import ThemeToggle from "./ThemeToggle.vue";

const route = useRoute();
const isScrolled = ref(false);
const openMenu = ref(null);
const mobileOpen = ref(false);
const mobileSection = ref(null);

const onScroll = () => {
  isScrolled.value = window.scrollY > 24;
};

const onFocusOut = (event) => {
  if (!event.currentTarget.contains(event.relatedTarget)) openMenu.value = null;
};

const closeAll = () => {
  openMenu.value = null;
  mobileOpen.value = false;
};

const toggleMobileSection = (path) => {
  mobileSection.value = mobileSection.value === path ? null : path;
};

watch(
  () => route.fullPath,
  () => closeAll(),
);

watch(mobileOpen, (open) => {
  document.body.classList.toggle("menu-open", open);
});

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  document.body.classList.remove("menu-open");
});
</script>
