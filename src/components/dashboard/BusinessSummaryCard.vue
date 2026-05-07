<template>
  <div class="summary-card" :class="{ clickable: isClickable }" @click="navigate">
    <h3 class="summary-title">{{ title }}</h3>
    <div class="summary-value">{{ displayValue }}</div>
    <p v-if="subtitle" class="summary-sub">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    title: string
    value: number | string
    subtitle?: string
    route?: string
  }>(),
  { subtitle: '', route: '' }
)

const router = useRouter()
const displayValue = computed(() =>
  typeof props.value === 'number' ? String(props.value) : props.value
)
const isClickable = computed(() => !!props.route)

function navigate() {
  if (props.route) router.push(props.route)
}
</script>

<style scoped>
.summary-card {
  padding: 1rem 1.125rem;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px -4px rgba(28, 25, 23, 0.06);
  border-radius: 0.875rem;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.25rem;
  min-height: 6rem;
}
.summary-card.clickable {
  cursor: pointer;
}
.summary-card.clickable:hover {
  background: rgba(255, 255, 255, 0.88);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 12px 48px -12px rgba(28, 25, 23, 0.08);
}
.summary-title {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: rgb(100 116 139);
}
.summary-value {
  font-size: 1.625rem;
  line-height: 1.1;
  font-weight: 800;
  font-family: Manrope, sans-serif;
  color: rgb(15 23 42);
  letter-spacing: -0.02em;
}
.summary-sub {
  margin: 0;
  font-size: 0.6875rem;
  color: rgb(148 163 184);
}
</style>
