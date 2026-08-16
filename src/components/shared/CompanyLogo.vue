<template>
  <img v-if="activeSource" v-bind="$attrs" :src="activeSource" :alt="alt" />
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "../../composables/useTheme";
import { companyLogos } from "../../data/companyLogos";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  logoKey: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const { isDark } = useTheme();
const sources = computed(() => companyLogos[props.logoKey]);
const activeSource = computed(() => {
  if (!sources.value) return "";

  return isDark.value
    ? sources.value.dark || sources.value.light
    : sources.value.light || sources.value.dark;
});
</script>

