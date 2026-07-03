import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../layouts/MainLayout.vue";

import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Businesses from "../pages/Businesses.vue";
import Impact from "../pages/Impact.vue";
import Partnerships from "../pages/Partnerships.vue";
import Insights from "../pages/Insights.vue";
import Contact from "../pages/Contact.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: {
          title: "Building Enterprises That Power Economies | Alphabomet Holdings",
          description:
            "Alphabomet Holdings is an Africa-focused holding company building enterprises across infrastructure, investment, technology, and trade.",
        },
      },
      {
        path: "about",
        name: "About",
        component: About,
        meta: {
          title: "About Alphabomet Holdings | Boundless Opportunities",
          description:
            "Learn about Alphabomet Holdings, its vision, mission, governance, leadership, and commitment to long-term economic value.",
        },
      },
      {
        path: "businesses",
        name: "Businesses",
        component: Businesses,
        meta: {
          title: "Our Businesses | Alphabomet Holdings",
          description:
            "Explore Alphabomet Holdings' core business areas across infrastructure, investment, technology, and strategic trade.",
        },
      },
      {
        path: "impact",
        name: "Impact",
        component: Impact,
        meta: {
          title: "Impact & Sustainability | Alphabomet Holdings",
          description:
            "Discover how Alphabomet Holdings creates economic, social, environmental, and governance impact across Africa.",
        },
      },
      {
        path: "partnerships",
        name: "Partnerships",
        component: Partnerships,
        meta: {
          title: "Partnerships | Alphabomet Holdings",
          description:
            "Partner with Alphabomet Holdings across government projects, PPPs, investors, DFIs, and strategic business opportunities.",
        },
      },
      {
        path: "insights",
        name: "Insights",
        component: Insights,
        meta: {
          title: "Insights | Alphabomet Holdings",
          description:
            "Read corporate updates, strategy insights, market perspectives, and thought leadership from Alphabomet Holdings.",
        },
      },
      {
        path: "contact",
        name: "Contact",
        component: Contact,
        meta: {
          title: "Contact Alphabomet Holdings",
          description:
            "Contact Alphabomet Holdings for business enquiries, partnerships, investor relations, media, and corporate information.",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;