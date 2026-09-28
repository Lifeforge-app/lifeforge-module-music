import { Stack, WithQuery } from '@lifeforge/ui'

import { useMusicContext } from '@/providers/MusicProvider'

import MusicListItem from './components/MusicListItem'

function MusicList({ searchQuery }: { searchQuery: string }) {
  const { musicsQuery, currentMusic } = useMusicContext()

  return (
    <WithQuery query={musicsQuery}>
      {musics => (
        <Stack
          as="ul"
          gap="sm"
          style={{ paddingBottom: currentMusic ? '9rem' : '2rem' }}
        >
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
