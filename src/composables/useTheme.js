import { computed, ref } from "vue";

const STORAGE_KEY = "alphabomet-theme";
const theme = ref("light");
let initialized = false;

const readStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
};

const applyTheme = (value, persist = true) => {
  theme.value = value;
  document.documentElement.dataset.theme = value;
  document.documentElement.style.colorScheme = value;

  if (persist) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Theme still works when storage is unavailable.
    }
  }
};

export const initializeTheme = () => {
  if (typeof window === "undefined") return;

  const existing = document.documentElement.dataset.theme;
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  applyTheme(
    existing === "dark" || existing === "light"
      ? existing
      : readStoredTheme() || preferred,
    false,
  );

  if (!initialized) {
    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY && (event.newValue === "dark" || event.newValue === "light")) {
        applyTheme(event.newValue, false);
      }
    });
    initialized = true;
  }
};

export const useTheme = () => {
  initializeTheme();

  return {
    theme,
    isDark: computed(() => theme.value === "dark"),
    toggleTheme: () => applyTheme(theme.value === "dark" ? "light" : "dark"),
  };
};
