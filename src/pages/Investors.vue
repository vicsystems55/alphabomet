<template>
  <ContentHubPage
    eyebrow="Investors"
    title="Patient capital. Disciplined growth. Enduring value."
    summary="A focused investment platform giving partners access to a diversified portfolio of essential African enterprises."
    index="04"
    :image="investorsImage"
    :image-credit="imageCredit"
    statement-label="The investment case"
    statement="Built around essential sectors, active ownership and a long horizon."
    body="Alphabomet combines disciplined capital allocation, shared operating capabilities and deep market understanding. We support independently focused companies with the governance, talent, technology and strategic direction required to build durable enterprise value."
    :facts="facts"
    :sections="sections"
    cta-eyebrow="Investor relations"
    cta-title="Explore our next chapter of growth."
    cta-label="Start an investor conversation"
    cta-path="/contact#partnerships"
  />
</template>

<script setup>
import {
  Briefcase,
  CalendarRange,
  Handshake,
  Layers3,
  Mail,
  ShieldCheck,
  TrendingUp,
} from "@lucide/vue";
import ContentHubPage from "../components/shared/ContentHubPage.vue";
import { groupStrategy } from "../data/aboutContent";
import { companyProfiles } from "../data/companyProfiles";
import { businessGroups } from "../data/siteNavigation";
import investorsImage from "../assets/images/investors-lagos.webp";

const imageCredit = {
  label: "Tunde Buremo",
  url: "https://unsplash.com/photos/an-aerial-view-of-a-busy-city-n8DxalbQBic",
};

const facts = [
  { value: businessGroups.length, label: "Strategic business groups" },
  { value: companyProfiles.length, label: "Portfolio companies" },
  { value: "Africa", label: "Primary market focus" },
];

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const portfolioLinks = businessGroups.map((group) => ({
  label: group.title,
  description: `${group.companies.length} ${group.companies.length === 1 ? "company" : "companies"}`,
  to: `/businesses/${slugify(group.title)}`,
}));

const sections = [
  {
    id: "investment-overview",
    label: "Investment Overview",
    icon: Briefcase,
    title: "A diversified platform built around essential sectors.",
    body:
      "Alphabomet is a parent holding company providing strategic leadership, governance, investment oversight and shared operating support to a portfolio of independently focused businesses serving physical and digital economies.",
    points: [
      "Long-term investment orientation",
      "Active strategic and governance support",
      "Diversified exposure across essential sectors",
    ],
  },
  {
    id: "why-invest",
    label: "Why Invest",
    icon: ShieldCheck,
    title: "A platform designed for durable enterprise growth.",
    body:
      "Our investment case is grounded in structural relevance, portfolio diversification, active ownership and disciplined execution. Alphabomet focuses on businesses positioned to meet enduring economic needs while contributing to Africa's transformation.",
    points: [
      "Structural relevance across high-need sectors",
      "Portfolio diversification across physical and digital economies",
      "A long-term horizon for sustainable value creation",
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: Layers3,
    title: "Multiple engines of growth. One strategic direction.",
    body:
      "Our portfolio connects independently focused companies through shared governance, operating discipline and a common ambition to build resilient, globally competitive African enterprises.",
    links: portfolioLinks,
    action: { label: "View the complete business portfolio", to: "/businesses" },
  },
  {
    id: "strategy-2026-2028",
    label: "Strategy 2026–2028",
    icon: CalendarRange,
    title: "Consolidate. Expand. Mature.",
    body:
      "The Group's strategic framework strengthens the corporate foundation first, then supports disciplined expansion and the development of globally competitive enterprises. Progress is governed by execution readiness rather than short-term pressure.",
    steps: groupStrategy,
  },
  {
    id: "growth-framework",
    label: "Growth Framework",
    icon: TrendingUp,
    title: "Shared capabilities that help businesses scale.",
    body:
      "Alphabomet combines portfolio-level oversight with operating support designed to improve execution, strengthen resilience and expand the capacity of each member company.",
    points: [
      "Disciplined capital allocation",
      "Governance and performance oversight",
      "Shared talent, technology and corporate services",
      "Strategic partnerships and market access",
    ],
  },
  {
    id: "partnerships",
    label: "Partnerships",
    icon: Handshake,
    title: "Aligned capital. Complementary expertise. Shared ambition.",
    body:
      "Alphabomet welcomes conversations with investors, institutions, operators and strategic partners whose capabilities, values and long-term outlook complement the Group's ambitions.",
    points: [
      "Strategic and institutional investors",
      "Technical and operating partners",
      "Market-access and development partnerships",
    ],
    action: { label: "Discuss a partnership", to: "/contact#partnerships" },
  },
  {
    id: "investor-contact",
    label: "Investor Contact",
    icon: Mail,
    title: "Start a focused investor conversation.",
    body:
      "Share your organisation, area of interest and the type of opportunity you would like to discuss. Your enquiry will be directed to the appropriate Alphabomet team for consideration.",
    points: [
      "Portfolio and investment enquiries",
      "Strategic partnership discussions",
      "Institutional and corporate engagement",
    ],
    action: { label: "Contact investor relations", to: "/contact#partnerships" },
  },
];
</script>
