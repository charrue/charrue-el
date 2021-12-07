import { getCurrentInstance } from '@vue/composition-api'

export const useStore = () => {
  return getCurrentInstance().proxy.$store
}
