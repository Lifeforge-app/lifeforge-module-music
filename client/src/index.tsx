import { useEffect } from 'react'

import {
  EmptyStateScreen,
  Flex,
  ModuleHeader,
  Scrollbar,
  SearchInput,
  WithQuery
} from '@lifeforge/ui'

import { useMusicContext } from '@/providers/MusicProvider'

import AddMusicButton from './components/AddMusicButton'
import BottomBar from './components/Bottombar'
import MusicList from './components/MusicList'
import './index.css'

function Music() {
  const { searchQuery, setSearchQuery, musicsQuery, currentMusic, togglePlay } =
    useMusicContext()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault()

        if (currentMusic !== null) {
          togglePlay(currentMusic).catch(console.error)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  })

  return (
    <>
      <ModuleHeader trailing={<AddMusicButton />} />
      <Flex
        className="music"
        direction="column"
        height="100%"
        minHeight="0"
        minWidth="0"
        position="relative"
        width="100%"
      >
        <SearchInput
          debounceMs={300}
          searchTarget="music"
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <Flex
          height="100%"
          minWidth="0"
          mt="md"
          position="relative"
          width="100%"
        >
          <Scrollbar>
            <WithQuery query={musicsQuery}>
              {musics =>
                musics.filter(music =>
                  music.name.toLowerCase().includes(searchQuery.toLowerCase())
                ).length > 0 ? (
                  <MusicList searchQuery={searchQuery} />
                ) : (
                  <EmptyStateScreen
                    icon={
                      musics.length > 0
                        ? 'tabler:search-off'
                        : 'tabler:music-off'
                    }
                    message={{
                      id: musics.length > 0 ? 'result' : 'music'
                    }}
                  />
                )
              }
            </WithQuery>
          </Scrollbar>
        </Flex>
        <BottomBar />
      </Flex>
    </>
  )
}

export default Music
