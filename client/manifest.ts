import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Music',
  icon: 'tabler:music',
  routes: {
    '/': lazy(() => import('@'))
  },
  category: 'Storage'
} satisfies ModuleConfig
