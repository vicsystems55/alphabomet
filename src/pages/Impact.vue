<template>
  <ContentHubPage
    eyebrow="Our Impact"
    title="Enterprise that advances people, economies and the continent."
    summary="We build enterprises to strengthen productive capacity, broaden opportunity and support resilient communities for generations."
    index="03"
    :image="impactImage"
    :image-credit="imageCredit"
    statement-label="Purpose in practice"
    statement="Growth and positive impact are one ambition."
    body="Alphabomet invests in businesses that address essential economic needs while creating the conditions for broader opportunity. Our approach connects commercial discipline with responsible leadership, practical innovation and an Africa-first understanding of long-term value."
    :sections="sections"
    cta-eyebrow="Shared progress"
    cta-title="Partner with us to create lasting value."
    cta-label="Explore partnerships"
    cta-path="/contact#partnerships"
  />
</template>

<script setup>
import { Building2, Globe2, Leaf, Lightbulb, ShieldCheck, Users } from "@lucide/vue";
import ContentHubPage from "../components/shared/ContentHubPage.vue";
import impactImage from "../assets/images/impact-sustainability.webp";

const imageCredit = {
  label: "Fajar Al Hadi",
  url: "https://unsplash.com/photos/wind-turbines-on-hills-at-sunset-with-city-below-PLOwULE7iKs",
};

const sections = [
  {
    id: "economic-development",
    label: "Economic Development",
    icon: Building2,
    title: "Building the foundations of productive economies.",
    body:
      "Through investments across energy, agriculture, infrastructure, logistics, technology and financial services, Alphabomet supports enterprises that expand productive capacity, strengthen value chains, enable trade and create opportunities for meaningful work.",
    points: [
      "Enterprise development and meaningful employment",
      "Infrastructure that enables productive activity",
      "Stronger local value chains and market access",
    ],
  },
  {
    id: "sustainability",
    label: "Sustainability",
    icon: Leaf,
    title: "Designing growth for the long term.",
    body:
      "We seek to connect commercial resilience with responsible resource use, renewable energy, sustainable agriculture, durable infrastructure and careful natural-resource development. Long-term decisions should protect the capacity of future generations to prosper.",
    points: [
      "Responsible resource use",
      "Resilient operations and infrastructure",
      "Long-term environmental and economic value",
    ],
  },
  {
    id: "esg",
    label: "ESG",
    icon: ShieldCheck,
    title: "Governance turns ambition into accountability.",
    body:
      "Responsible governance, ethical leadership, clear oversight and disciplined execution guide how the Group allocates capital, supports its companies and creates long-term stakeholder value.",
    points: [
      "Responsible corporate governance",
      "Environmental and social awareness",
      "Ethical, accountable leadership",
    ],
  },
  {
    id: "communities",
    label: "Communities",
    icon: Users,
    title: "Progress should be felt where businesses operate.",
    body:
      "We seek to create opportunity through employment, skills development, inclusive enterprise growth and constructive relationships with the communities connected to our businesses.",
    points: [
      "Skills and talent development",
      "Inclusive access to opportunity",
      "Constructive local partnerships",
    ],
  },
  {
    id: "innovation",
    label: "Innovation",
    icon: Lightbulb,
    title: "Technology as an engine for wider access.",
    body:
      "Across artificial intelligence, digital government, tax technology, financial services and enterprise platforms, Alphabomet develops solutions that can improve access, modernize institutions and help organizations operate more effectively.",
    points: [
      "Practical digital transformation",
      "Modern public and enterprise services",
      "Scalable solutions for African markets",
    ],
  },
  {
    id: "africa-first",
    label: "Africa First",
    icon: Globe2,
    title: "Local understanding. Globally competitive execution.",
    body:
      "Our Africa-first outlook begins with the continent's realities and opportunities. We combine local insight with global standards to build practical, scalable enterprises designed for lasting relevance—solving African problems with global optimal solutions.",
    points: [
      "African insight and leadership",
      "Solutions grounded in local realities",
      "Global standards and competitiveness",
    ],
  },
];
</script>
