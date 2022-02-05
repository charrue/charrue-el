import { getCurrentInstance } from '@vue/composition-api'

export const useStore = () => getCurrentInstance().proxy.$store
