<template>
  <div class="workflow-sidebar">
    <h4 class="sidebar-title">流程状态</h4>
    <ol class="steps-vertical">
      <li
        v-for="(title, i) in stepTitles"
        :key="i"
        class="step-item"
        :class="{ done: i < activeStep, current: i === activeStep }"
      >
        <span class="step-dot" />
        <span class="step-title">{{ title }}</span>
      </li>
    </ol>
    <p class="current-node">{{ currentNodeText }}</p>
    <div class="quick-actions">
      <slot name="actions" />
    </div>
    <BaseButton class="log-btn" variant="ghost" size="sm" @click="$emit('openLog')">最近事件日志</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LegacyTaskStatus as TaskStatus } from '@/domain/types/task'
import BaseButton from '@/components/base/BaseButton.vue'

/**
 * @deprecated 该侧栏仍基于 LegacyTaskStatus 扁平状态映射。
 * 主流程展示请优先使用 WorkflowProgress（mainStatus + subStatus）。
 */
const stepTitles = ['创建', '指派', '设计中', '初审', '复审/仓库', '完成']

const props = defineProps<{ status: TaskStatus }>()

defineEmits<{ openLog: [] }>()

const statusToStep: Record<TaskStatus, number> = {
  Draft: 0,
  PendingAssign: 1,
  InProgress: 2,
  PendingAuditA: 3,
  RejectedByAuditA: 3,
  PendingAuditB: 4,
  RejectedByAuditB: 4,
  PendingOutsource: 4,
  Outsourcing: 4,
  PendingOutsourceReview: 4,
  PendingCustomizationReview: 4,
  PendingCustomizationProduction: 4,
  PendingEffectReview: 4,
  PendingEffectRevision: 4,
  PendingProductionTransfer: 4,
  PendingWarehouseQC: 4,
  RejectedByWarehouse: 4,
  PendingWarehouseReceive: 4,
  PendingClose: 5,
  Completed: 5,
  Archived: 5,
  Blocked: 2,
  Cancelled: 0,
}

const activeStep = computed(() => statusToStep[props.status] ?? 0)

const currentNodeText = computed(() => {
  const s = props.status
  if (s === 'PendingAssign') return '待指派设计师'
  if (s === 'InProgress') return '设计师进行中'
  if (s === 'PendingAuditA' || s === 'RejectedByAuditA') return '待审核'
  if (s === 'PendingAuditB' || s === 'RejectedByAuditB') return '待审核'
  if (s === 'PendingCustomizationReview') return '定制中'
  if (s === 'PendingCustomizationProduction') return '待定制生产'
  if (s === 'PendingEffectReview') return '待效果审核'
  if (s === 'PendingEffectRevision') return '待效果返修'
  if (s === 'PendingProductionTransfer') return '待生产流转'
  if (s === 'PendingWarehouseQC') return '待仓库质检'
  if (s === 'RejectedByWarehouse') return '仓库驳回回流'
  if (s === 'PendingWarehouseReceive') return '待仓库接收'
  if (s === 'PendingClose') return '待结单'
  if (s === 'Completed' || s === 'Archived') return '已完结'
  return '当前节点'
})
</script>

<style scoped>
.workflow-sidebar {
  padding: 1rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.sidebar-title {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
}
.steps-vertical {
  list-style: none;
  margin: 0;
  padding: 0;
}
.step-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  font-size: 0.8125rem;
  color: #94a3b8;
}
.step-item.done {
  color: #059669;
}
.step-item.current {
  color: #0f172a;
  font-weight: 500;
}
.step-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
}
.step-item.current .step-dot {
  opacity: 1;
}
.step-title {
  flex: 1;
}
.current-node {
  margin: 0.75rem 0;
  font-size: 0.8125rem;
  color: #64748b;
}
.quick-actions {
  margin-bottom: 0.75rem;
}
.log-btn {
  font-size: 0.8125rem;
}
</style>
