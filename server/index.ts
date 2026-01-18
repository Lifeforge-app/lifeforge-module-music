import { forgeRouter } from '@lifeforge/server-utils'

import * as entriesRoutes from './routes/entries'
import * as youtubeRoutes from './routes/youtube'

export default forgeRouter({
  entries: entriesRoutes,
  youtube: youtubeRoutes
})
