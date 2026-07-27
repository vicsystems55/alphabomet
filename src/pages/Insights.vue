<template>
  <OverviewPage
    eyebrow="Insights"
    title="Ideas and intelligence from across our ecosystem."
    summary="Corporate news, market perspectives and considered views on the forces shaping African enterprise."
    index="05"
    statement-label="From the group"
    statement="See the opportunities taking shape across our companies and markets."
    body="Our insights bring together operating experience, sector expertise and an Africa-first outlook. Follow Alphabomet's milestones and explore the ideas informing our investment and growth decisions."
    links-title="Explore our newsroom"
    links-summary="Access news, thought leadership, media resources and events from Alphabomet and its portfolio."
    :items="items"
    cta-eyebrow="Stay informed"
    cta-title="Follow the ideas shaping our future."
    cta-label="View latest news"
    cta-path="/insights/news"
  />
</template>

<script setup>
import OverviewPage from "../components/shared/OverviewPage.vue";
import { navigation } from "../data/siteNavigation";

const items = navigation.find((item) => item.path === "/insights").children;
</script>
