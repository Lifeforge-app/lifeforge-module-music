import { asc, desc, eq } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-orm/zod'
import z from 'zod'

import forge from '../forge'
import { musicEntries } from '../schema.drizzle'

const entryDto = createSelectSchema(musicEntries)

export const list = forge
  .query({
    description: 'Retrieve all music entries',
    output: {
      OK: z.array(entryDto)
    }
  })
  .callback(async ({ db, response }) => {
    const rows = await db
      .select()
      .from(musicEntries)
      .orderBy(desc(musicEntries.is_favourite), asc(musicEntries.name))

    return response.ok(rows)
  })

export const update = forge
  .mutation({
    description: 'Update music entry details',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), musicEntries)
      }),
      body: z.object({
        name: z.string(),
        author: z.string()
      })
    },
    output: {
      OK: entryDto
    }
  })
  .callback(async ({ db, query: { id }, body, response }) => {
    const [updated] = await db
      .update(musicEntries)
      .set({ ...body, updated: new Date() })
      .where(eq(musicEntries.id, id))
      .returning()

    return response.ok(updated)
  })

export const remove = forge
  .mutation({
    description: 'Delete a music entry',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), musicEntries)
      })
    },
    output: {
      NO_CONTENT: true
    }
  })
  .callback(async ({ db, query: { id }, core, response }) => {
    const entry = await db.query.entries.findFirst({ where: { id } })

    if (entry?.file) {
      await core.storage.delete(entry.file)
    }

    await db.delete(musicEntries).where(eq(musicEntries.id, id))

    return response.noContent()
  })

export const toggleFavourite = forge
  .mutation({
    description: 'Toggle favourite status of a music entry',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), musicEntries)
      })
    },
    output: {
      OK: entryDto
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    const entry = (await db.query.entries.findFirst({ where: { id } }))!

    const [updated] = await db
      .update(musicEntries)
      .set({ is_favourite: !entry.is_favourite, updated: new Date() })
      .where(eq(musicEntries.id, id))
      .returning()

    return response.ok(updated)
  })
