import { forgeController, forgeRouter } from '@functions/routes'
import z from 'zod'

const list = forgeController
  .query()
  .description({
    en: 'Retrieve all music entries',
    ms: 'Dapatkan semua entri muzik',
    'zh-CN': '获取所有音乐条目',
    'zh-TW': '獲取所有音樂條目'
  })
  .input({})
  .callback(({ pb }) =>
    pb.getFullList
      .collection('music__entries')
      .sort(['-is_favourite', 'name'])
      .execute()
  )

const update = forgeController
  .mutation()
  .description({
    en: 'Update music entry details',
    ms: 'Kemas kini butiran entri muzik',
    'zh-CN': '更新音乐条目详情',
    'zh-TW': '更新音樂條目詳情'
  })
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
    pb.update.collection('music__entries').id(id).data(body).execute()
  )

const remove = forgeController
  .mutation()
  .description({
    en: 'Delete a music entry',
    ms: 'Padam entri muzik',
    'zh-CN': '删除音乐条目',
    'zh-TW': '刪除音樂條目'
  })
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'music__entries'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('music__entries').id(id).execute()
  )

const toggleFavourite = forgeController
  .mutation()
  .description({
    en: 'Toggle favourite status of a music entry',
    ms: 'Togol status kegemaran entri muzik',
    'zh-CN': '切换音乐条目的收藏状态',
    'zh-TW': '切換音樂條目的收藏狀態'
  })
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'music__entries'
  })
  .statusCode(200)
  .callback(async ({ pb, query: { id } }) => {
    const entry = await pb.getOne.collection('music__entries').id(id).execute()

    return pb.update
      .collection('music__entries')
      .id(id)
      .data({ is_favourite: !entry.is_favourite })
      .execute()
  })

export default forgeRouter({
  list,
  update,
  remove,
  toggleFavourite
})
