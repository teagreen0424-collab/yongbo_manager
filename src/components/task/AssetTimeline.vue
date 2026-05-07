<template>
  <div class="asset-timeline">
    <h4 class="block-title">设计资产版本时间线</h4>
    <div v-if="!versions.length" class="empty">暂无资产版本</div>
    <ul v-else class="timeline-list">
      <li v-for="v in versions" :key="v.id" class="timeline-item">
        <span class="version-type">{{ versionTypeLabel(v.type) }}</span>
        <span class="version-meta">{{ v.uploaderName }} · {{ formatDate(v.uploadedAt) }}</span>
        <p v-if="v.note" class="version-note">{{ v.note }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TaskAssetVersion, AssetVersionType } from '@/types'
import { formatDateBeijingOffsetAware } from '@/utils/date'

defineProps<{ versions: TaskAssetVersion[] }>()

function versionTypeLabel(type: AssetVersionType) {
  const m: Record<AssetVersionType, string> = {
    reference: '参考图',
    draft: '初稿',
    revision: '修改稿',
    final: '终稿',
    derivative: '二创稿',
  }
  return m[type] ?? type
}

function formatDate(iso: string) {
  return formatDateBeijingOffsetAware(iso)
}
</script>

<style scoped>
.asset-timeline {
  padding: 1rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.block-title {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
}
.empty {
  font-size: 0.875rem;
  color: #94a3b8;
}
.timeline-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.timeline-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.8125rem;
}
.timeline-item:last-child {
  border-bottom: none;
}
.version-type {
  font-weight: 500;
  color: #0f172a;
  margin-right: 0.5rem;
}
.version-meta {
  color: #64748b;
}
.version-note {
  margin: 0.25rem 0 0;
  color: #475569;
}
</style>
