import { computed } from 'vue'
import { usePermissionsStore } from '@/stores/permissions'

export function useMenuVisibility() {
  const permissionsStore = usePermissionsStore()
  const isReportVisible = computed(() => permissionsStore.currentUser?.role === 'super_admin')
  return { isReportVisible }
}
