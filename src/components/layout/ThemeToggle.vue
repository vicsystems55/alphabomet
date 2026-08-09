<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Light mode' : 'Dark mode'"
    :aria-pressed="isDark"
    @click="toggleTheme"
  >
    <Transition name="theme-icon" mode="out-in">
      <Sun v-if="isDark" key="sun" :size="17" stroke-width="1.8" />
      <Moon v-else key="moon" :size="17" stroke-width="1.8" />
    </Transition>
    <span class="theme-toggle__label">{{ isDark ? "Light" : "Dark" }}</span>
  </button>
</template>

<script setup>
import { Moon, Sun } from "@lucide/vue";
import { useTheme } from "../../composables/useTheme";

const { isDark, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-width: 3rem;
  height: 2.75rem;
  padding: 0 0.75rem;
  border: 1px solid rgba(220, 193, 144, 0.38);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--gold);
  cursor: pointer;
  transition: 200ms ease;
}

.theme-toggle:hover {
  border-color: var(--gold);
  background: rgba(220, 193, 144, 0.12);
}

.theme-toggle__label {
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: opacity 140ms ease, transform 160ms ease;
}

.theme-icon-enter-from,
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(-35deg) scale(0.75);
}

@media (max-width: 1180px) {
  .theme-toggle {
    width: 2.75rem;
    min-width: 2.75rem;
    padding: 0;
  }

  .theme-toggle__label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
}
</style>
