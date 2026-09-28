import { useMemo } from 'react'

import { Box, Icon, Transition, toast } from '@lifeforge/ui'

import { type MusicEntry, useMusicContext } from '@/providers/MusicProvider'

function PlayStateIndicator({ music }: { music: MusicEntry }) {
  const { currentMusic, isPlaying, togglePlay } = useMusicContext()

  const isActive = currentMusic?.id === music.id

  const stateIcon = useMemo(() => {
    if (isActive) {
      return isPlaying ? 'tabler:disc' : 'tabler:pause'
    }

    return 'tabler:play'
  }, [isActive, isPlaying])

  return (
    <Transition duration={150} property="all">
      <Box
        as="button"
        bg={isActive ? undefined : { hover: 'bg-100', darkHover: 'bg-800' }}
        p="md"
        r="lg"
        onClick={() => {
          togglePlay(music).catch(err => {
            toast.error(`Failed to play music. Error: ${err}`)
          })
        }}
      >
        <Icon
          color={
            isActive
              ? isPlaying
                ? 'primary'
                : { base: 'bg-800', dark: 'bg-50' }
              : { base: 'bg-500', hover: 'bg-800', darkHover: 'bg-50' }
          }
          icon={stateIcon}
          style={
            isActive && isPlaying
              ? { animation: 'rotation 1s linear infinite' }
              : undefined
          }
        />
      </Box>
    </Transition>
  )
}

export default PlayStateIndicator
