import z from 'zod'

import forge from '../forge'

export const list = forge
  .query()
  .description('Retrieve all music entries')
  .input({})
  .callback(({ pb }) =>
    pb.getFullList
      .collection('entries')
      .sort(['-is_favourite', 'name'])
      .execute()
  )

export const update = forge
  .mutation()
  .description('Update music entry details')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: z.object({
      name: z.string(),
      author: z.string()
    })
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('entries').id(id).data(body).execute()
  )

export const remove = forge
  .mutation()
  .description('Delete a music entry')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'entries'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('entries').id(id).execute()
  )

export const toggleFavourite = forge
  .mutation()
  .description('Toggle favourite status of a music entry')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'entries'
  })
  .statusCode(200)
  .callback(async ({ pb, query: { id } }) => {
    const entry = await pb.getOne.collection('entries').id(id).execute()

    return pb.update
      .collection('entries')
      .id(id)
      .data({ is_favourite: !entry.is_favourite })
      .execute()
  })
