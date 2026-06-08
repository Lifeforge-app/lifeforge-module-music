import { lazy } from 'react'

import { createForgeModuleClient } from '@lifeforge/federation'

import contract from './contract'

const { forgeAPI, ...manifest } = createForgeModuleClient({
  provider: lazy(() => import('@/providers/MusicProvider')),
  routes: {
    '/': lazy(() => import('@'))
  },
  widgets: [() => import('@/widgets/MusicPlayer')],
  contract
})

export default manifest

export { forgeAPI }
