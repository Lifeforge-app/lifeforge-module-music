import { Stack, WithQuery } from '@lifeforge/ui'

import { useMusicContext } from '@/providers/MusicProvider'

import MusicListItem from './components/MusicListItem'

function MusicList({ searchQuery }: { searchQuery: string }) {
  const { musicsQuery } = useMusicContext()

  return (
    <WithQuery query={musicsQuery}>
      {musics => (
        <Stack as="ul" gap="sm" pb="2xl">
          {musics
            .filter(music =>
              music.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(music => (
              <MusicListItem key={music.id} music={music} />
            ))}
        </Stack>
      )}
    </WithQuery>
  )
}

export default MusicList
