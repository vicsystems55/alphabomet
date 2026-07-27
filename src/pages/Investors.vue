<template>
  <OverviewPage
    eyebrow="Investors"
    title="Patient capital. Disciplined growth. Enduring value."
    summary="A focused investment platform giving partners access to a diversified portfolio of essential African enterprises."
    index="04"
    statement-label="The investment case"
    statement="Built around real sectors, durable demand and a long horizon."
    body="Alphabomet combines active ownership with shared operating capabilities, disciplined capital allocation and deep market knowledge. We invest behind companies positioned to compound value while contributing to Africa's economic transformation."
    links-title="Investor centre"
    links-summary="Explore our portfolio thesis, growth framework and opportunities to invest alongside Alphabomet."
    :items="items"
    cta-eyebrow="Investor relations"
    cta-title="Explore our next chapter of growth."
    cta-label="Contact investor relations"
    cta-path="/investors/investor-contact"
  />
</template>

<script setup>
import OverviewPage from "../components/shared/OverviewPage.vue";
import { navigation } from "../data/siteNavigation";

const items = navigation.find((item) => item.path === "/investors").children;
</script>
