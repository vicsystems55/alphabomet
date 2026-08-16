const logoFiles = import.meta.glob("../assets/companies/*.png", {
  eager: true,
  import: "default",
});

const registry = {};

Object.entries(logoFiles).forEach(([path, source]) => {
  const filename = path.split("/").pop()?.replace(/\.png$/i, "");
  if (!filename) return;

  const isDarkVariant = filename.endsWith("-white");
  const key = filename.replace(/-white$/, "");

  registry[key] ||= {};
  registry[key][isDarkVariant ? "dark" : "light"] = source;
});

Object.values(registry).forEach(Object.freeze);

export const companyLogos = Object.freeze(registry);

