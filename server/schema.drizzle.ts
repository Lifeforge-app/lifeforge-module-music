import { type RelationsBuilder } from 'drizzle-orm'
import { boolean, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { createModuleTable } from '@lifeforge/drizzle'

const pgTable = createModuleTable()

export const musicEntries = pgTable('entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().default(''),
  duration: text('duration').notNull().default(''),
  author: text('author').notNull().default(''),
  file: text('file').notNull().default(''),
  is_favourite: boolean('is_favourite').notNull().default(false),
  created: timestamp('created', { mode: 'date' }).defaultNow().notNull(),
  updated: timestamp('updated', { mode: 'date' }).defaultNow().notNull()
})

export const tables = { entries: musicEntries }

export const relations = (_r: RelationsBuilder<typeof tables>) => ({})
