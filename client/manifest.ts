import { lazy } from 'react'

import type { ModuleConfig } from '@lifeforge/shared'

export default {
  provider: lazy(() => import('@/providers/MusicProvider')),
  routes: {
    '/': lazy(() => import('@'))
  },
  widgets: [() => import('@/widgets/MusicPlayer')]
} satisfies ModuleConfig
