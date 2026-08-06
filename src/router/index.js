import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Businesses from "../pages/Businesses.vue";
import Impact from "../pages/Impact.vue";
import Investors from "../pages/Investors.vue";
import Insights from "../pages/Insights.vue";
import Contact from "../pages/Contact.vue";
import CompanyProfile from "../pages/CompanyProfile.vue";
import BusinessSector from "../pages/BusinessSector.vue";
import UnderConstruction from "../components/shared/UnderConstruction.vue";
import { businessGroups, flatNavigation } from "../data/siteNavigation";

const pageMeta = {
  "/about": {
    title: "About Alphabomet Holdings | Boundless Opportunities",
    description: "Meet the vision, values, leadership and governance behind Alphabomet Holdings.",
  },
  "/businesses": {
    title: "Our Businesses | Alphabomet Holdings",
    description: "Explore Alphabomet companies across energy, agriculture, infrastructure, mining, logistics and technology.",
  },
  "/impact": {
    title: "Impact & Sustainability | Alphabomet Holdings",
    description: "Discover how Alphabomet creates economic, social and environmental impact across Africa.",
  },
  "/investors": {
    title: "Investors | Alphabomet Holdings",
    description: "Explore Alphabomet's portfolio, investment strategy and long-term growth framework.",
  },
  "/insights": {
    title: "Insights | Alphabomet Holdings",
    description: "Read news, market perspectives and corporate updates from Alphabomet Holdings.",
  },
  "/contact": {
    title: "Contact | Alphabomet Holdings",
    description: "Connect with Alphabomet for partnerships, careers, investors and general enquiries.",
  },
};

const sectionComponents = {
  "/about": About,
  "/businesses": Businesses,
  "/impact": Impact,
  "/investors": Investors,
  "/insights": Insights,
  "/contact": Contact,
};

const contentRoutes = flatNavigation.map((page) => {
  const isOverview = page.path in sectionComponents;
  const isCompany = Boolean(page.companySlug);
  const isContactPage = page.path === "/contact/contact-us";
  const businessGroup = businessGroups.find(
    (group) => group.title === page.label && page.path.startsWith("/businesses/"),
  );
  const isBusinessSector = Boolean(businessGroup);
  const parentPath = page.path.split("/").slice(0, 2).join("/");
  const meta = isOverview
    ? pageMeta[page.path]
    : {
        title: `${page.label} | Alphabomet Holdings`,
        description: `Explore ${page.label} at Alphabomet Holdings.`,
        pageTitle: page.label,
        section: page.section,
        parentPath,
        companySlug: page.companySlug,
        businessGroup: businessGroup?.title,
      };

  return {
    path: page.path.slice(1),
    ...(isCompany || isBusinessSector
      ? { alias: `/${page.path.split("/").slice(2).join("/")}` }
      : {}),
    name: page.path.slice(1).replaceAll("/", "-"),
    component: isOverview || isContactPage
      ? (sectionComponents[page.path] || Contact)
      : isBusinessSector
        ? BusinessSector
      : isCompany
        ? CompanyProfile
        : UnderConstruction,
    meta,
  };
});

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
        meta: {
          title: "Building Enterprises That Power Economies | Alphabomet Holdings",
          description: "Alphabomet is an Africa-focused group building enterprises across essential sectors.",
        },
      },
      ...contentRoutes,
      {
        path: "businesses/technology/paymanent",
        redirect: "/businesses/financial-services/paymanent",
      },
      {
        path: "technology/paymanent",
        redirect: "/financial-services/paymanent",
      },
      {
        path: "businesses/defense-and-security/airlandeep-international",
        redirect: "/businesses/defence/airlandeep-international",
      },
      {
        path: "defense-and-security/airlandeep-international",
        redirect: "/defence/airlandeep-international",
      },
      { path: "partnerships", redirect: "/investors/partnerships" },
      {
        path: ":pathMatch(.*)*",
        name: "not-found",
        component: UnderConstruction,
        meta: {
          title: "Page Not Found | Alphabomet Holdings",
          pageTitle: "Page not found",
          section: "Alphabomet",
          parentPath: "/",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  document.title = to.meta.title || "Alphabomet Holdings";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", to.meta.description || "");
});

export default router;
