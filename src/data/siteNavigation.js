import { companyProfiles } from "./companyProfiles";

export const businessGroups = [
  {
    title: "Energy",
    description: "Powering growth through resilient energy ventures.",
  },
  {
    title: "Agriculture",
    description: "Advancing food systems and sustainable agriculture.",
  },
  {
    title: "Infrastructure",
    description: "Building the assets that connect economies.",
  },
  {
    title: "Mining",
    description: "Developing mineral resources responsibly.",
  },
  {
    title: "Logistics",
    description: "Connecting African trade to global markets.",
  },
  {
    title: "Technology",
    description: "Creating platforms for a digital-first Africa.",
  },
  {
    title: "Investment",
    description: "Mobilizing capital and developing ventures for lasting value.",
  },
  {
    title: "Defense & Security",
    description: "Supporting safety, resilience and mission-critical capability.",
  },
].map((group) => ({
  ...group,
  companies: companyProfiles.filter((company) => company.group === group.title),
}));

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const navigation = [
  {
    label: "About",
    path: "/about",
    intro: "The ambition, leadership and principles behind Alphabomet.",
    children: [
      "Who We Are",
      "Chairman's Message",
      "Our Vision & Mission",
      "Our Values",
      "Our Strategy",
      "Leadership",
      "Governance & ESG",
    ].map((label) => ({ label, path: `/about/${slugify(label)}` })),
  },
  {
    label: "Our Businesses",
    path: "/businesses",
    intro: "One ecosystem. Multiple engines of African growth.",
    featured: true,
    children: [
      { label: "All Companies", path: "/businesses/all-companies" },
      ...businessGroups.map(({ title, companies }) => ({
        label: title,
        path: `/businesses/${slugify(title)}`,
        children: companies.map((company) => ({
          label: company.navigationName,
          path: `/businesses/${slugify(title)}/${company.slug}`,
          companySlug: company.slug,
        })),
      })),
      {
        label: "Explore Our Ecosystem",
        path: "/businesses/explore-our-ecosystem",
      },
    ],
  },
  {
    label: "Impact",
    path: "/impact",
    intro: "Enterprise measured by the progress it creates.",
    children: [
      "Economic Development",
      "Sustainability",
      "ESG",
      "Communities",
      "Innovation",
      "Africa First",
    ].map((label) => ({ label, path: `/impact/${slugify(label)}` })),
  },
  {
    label: "Investors",
    path: "/investors",
    intro: "A disciplined platform for patient, purposeful capital.",
    children: [
      "Investment Overview",
      "Why Invest",
      "Portfolio",
      "Strategy 2026-2028",
      "Growth Framework",
      "Partnerships",
      "Investor Contact",
    ].map((label) => ({ label, path: `/investors/${slugify(label)}` })),
  },
  {
    label: "Insights",
    path: "/insights",
    intro: "Perspectives from across our markets and companies.",
    children: [
      "News",
      "Articles",
      "Press Releases",
      "Media",
      "Industry Insights",
      "Events",
    ].map((label) => ({ label, path: `/insights/${slugify(label)}` })),
  },
  {
    label: "Contact",
    path: "/contact",
    intro: "Start a conversation with the Alphabomet team.",
    children: [
      { label: "Contact Us", path: "/contact/contact-us" },
      { label: "Careers", path: "/contact/careers" },
      { label: "Partner With Us", path: "/contact/partner-with-us" },
      { label: "Locations", path: "/contact/locations" },
    ],
  },
];

export const flatNavigation = navigation.flatMap((section) => [
  {
    label: section.label,
    path: section.path,
    section: section.label,
  },
  ...section.children.flatMap((item) => [
    {
      label: item.label,
      path: item.path,
      section: section.label,
    },
    ...(item.children || []).map((child) => ({
      label: child.label,
      path: child.path,
      section: item.label,
      companySlug: child.companySlug,
    })),
  ]),
]);
