<template>
  <ContentHubPage
    eyebrow="Insights"
    title="Ideas and intelligence from across our ecosystem."
    summary="Corporate developments, market perspectives and considered views on the forces shaping African enterprise."
    index="05"
    :image="insightsImage"
    :image-credit="imageCredit"
    statement-label="From the Group"
    statement="Perspective grounded in building and operating African enterprises."
    body="Our insights bring together portfolio experience, sector knowledge and an Africa-first outlook on the forces shaping enterprise, investment and economic transformation. This page provides one clear destination for Group updates, formal communications and informed perspectives."
    :sections="sections"
    cta-eyebrow="Media and communications"
    cta-title="Connect with the team behind our Group communications."
    cta-label="Contact communications"
    cta-path="/contact#media"
  />
</template>

<script setup>
import {
  BookOpen,
  CalendarDays,
  ChartNoAxesCombined,
  Megaphone,
  Newspaper,
  Video,
} from "@lucide/vue";
import ContentHubPage from "../components/shared/ContentHubPage.vue";
import insightsImage from "../assets/images/insights-collaboration.webp";

const imageCredit = {
  label: "Headway",
  url: "https://unsplash.com/photos/person-gesturing-during-meeting-with-laptop-5QgIuuBxKwM",
};

const sections = [
  {
    id: "news",
    label: "News",
    icon: Newspaper,
    title: "Developments from across the Group.",
    body:
      "Corporate developments, portfolio milestones and verified updates from Alphabomet and its member companies will be presented here as they are announced.",
    points: [
      "Group and portfolio developments",
      "Operating milestones",
      "Leadership and corporate updates",
    ],
  },
  {
    id: "articles",
    label: "Articles",
    icon: BookOpen,
    title: "Long-form thinking from leaders and specialists.",
    body:
      "Perspectives on enterprise development, governance, innovation, investment, technology and the work of building resilient African businesses.",
    points: [
      "Leadership and enterprise building",
      "Technology and institutional modernization",
      "Investment and sustainable growth",
    ],
  },
  {
    id: "press-releases",
    label: "Press Releases",
    icon: Megaphone,
    title: "Official statements, clearly presented.",
    body:
      "This section serves as the central record for approved announcements, strategic partnerships, corporate milestones and other formal Alphabomet communications.",
    points: [
      "Approved corporate announcements",
      "Strategic partnership updates",
      "Formal Group communications",
    ],
  },
  {
    id: "media",
    label: "Media",
    icon: Video,
    title: "A clear route for media engagement.",
    body:
      "Journalists, producers and communications partners can request Group information, interviews, commentary and approved media resources through the Alphabomet contact team.",
    points: [
      "Interview and commentary requests",
      "Corporate information",
      "Approved brand and media resources",
    ],
    action: { label: "Send a media enquiry", to: "/contact#media" },
  },
  {
    id: "industry-insights",
    label: "Industry Insights",
    icon: ChartNoAxesCombined,
    title: "Signals shaping Africa's strategic sectors.",
    body:
      "Our portfolio offers a practical vantage point on the systems shaping African growth. Future perspectives will connect sector developments with the realities of building and operating durable enterprises.",
    points: [
      "Energy transition and resource development",
      "Food systems and agricultural productivity",
      "Infrastructure, logistics and urban growth",
      "Artificial intelligence and digital government",
      "Financial inclusion and modern payments",
      "Investment and enterprise development",
    ],
  },
  {
    id: "events",
    label: "Events",
    icon: CalendarDays,
    title: "Conversations that connect ideas and action.",
    body:
      "Confirmed forums, roundtables, portfolio engagements and industry events will be published here with the information visitors need to participate.",
    points: [
      "Leadership and investor briefings",
      "Industry forums and roundtables",
      "Portfolio and partnership engagements",
    ],
    action: { label: "Contact the communications team", to: "/contact#media" },
  },
];
</script>
