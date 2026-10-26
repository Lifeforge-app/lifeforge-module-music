import { lazy } from 'react'

import { createForgeModule } from '@lifeforge/federation'

import type { Contract } from './contract'

const { forgeAPI, ...manifest } = createForgeModule<Contract>({
  provider: lazy(() => import('@/providers/MusicProvider')),
  routes: {
    '/': lazy(() => import('@'))
  },
  widgets: [() => import('@/widgets/MusicPlayer')]
})

export default manifest

export { forgeAPI }
