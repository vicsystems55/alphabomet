<template>
  <footer class="site-footer">
    <div class="site-footer__top">
      <div>
        <p class="eyebrow">Alphabomet Holdings</p>
        <h2>Building Africa's next generation of enduring enterprises.</h2>
      </div>
      <RouterLink to="/contact/partner-with-us" class="footer-cta">
        Start a conversation <ArrowUpRight :size="20" />
      </RouterLink>
    </div>

    <div class="site-footer__grid">
      <div class="site-footer__brand">
        <img :src="logo" alt="Alphabomet Holdings" />
        <p>A diversified African holding company creating sustainable value across essential sectors.</p>
      </div>

      <div v-for="item in navigation.slice(0, 4)" :key="item.path">
        <RouterLink :to="item.path" class="site-footer__title">{{ item.label }}</RouterLink>
        <ul>
          <li v-for="child in item.children.slice(0, 4)" :key="child.path">
            <RouterLink :to="child.path">{{ child.label }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="site-footer__bottom">
      <p>© {{ new Date().getFullYear() }} Alphabomet Holdings. All rights reserved.</p>
      <div>
        <RouterLink to="/about/governance-and-esg">Governance & ESG</RouterLink>
        <RouterLink to="/contact/contact-us">Contact</RouterLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ArrowUpRight } from "@lucide/vue";
import logo from "../../assets/images/logo.png";
import { navigation } from "../../data/siteNavigation";
</script>
