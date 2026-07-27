<template>
  <OverviewPage
    eyebrow="Our Impact"
    title="Progress that reaches beyond the balance sheet."
    summary="We build enterprises to deliver economic strength, broader opportunity and resilient communities for generations."
    index="03"
    statement-label="Purpose in practice"
    statement="For Alphabomet, growth and positive impact are the same ambition."
    body="Our businesses create jobs, expand infrastructure, strengthen local value chains and develop technology with an Africa-first point of view. We embed environmental, social and governance thinking into the way we invest and operate."
    links-title="How we create impact"
    links-summary="Our framework connects commercial discipline with clear outcomes for people, communities and the continent."
    :items="items"
    cta-eyebrow="Shared progress"
    cta-title="Partner with us to multiply the impact."
  />
</template>

<script setup>
import OverviewPage from "../components/shared/OverviewPage.vue";
import { navigation } from "../data/siteNavigation";

const items = navigation.find((item) => item.path === "/impact").children;
</script>
