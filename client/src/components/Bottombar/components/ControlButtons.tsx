import { Button, Flex, toast } from '@lifeforge/ui'

import { useMusicContext } from '@/providers/MusicProvider'

export default function ControlButtons({
  isWidget = false,
  isFull = false
}: {
  isWidget?: boolean
  isFull?: boolean
}) {
  const {
    currentMusic,
    isPlaying,
    isShuffle,
    isRepeat,
    setIsShuffle,
    setIsRepeat,
    togglePlay,
    nextMusic,
    lastMusic
  } = useMusicContext()

  if (currentMusic === null) {
    return <></>
  }

  return (
    <Flex
      centered
      gap="sm"
      width={!isWidget ? { xl: '33.3333%' } : undefined}
    >
      {(isFull || !isWidget) && (
        <Button
          icon="uil:shuffle"
          variant={isShuffle ? 'tertiary' : 'plain'}
          onClick={() => {
            setIsShuffle(!isShuffle)
            if (!isShuffle) setIsRepeat(false)
          }}
        />
      )}
      <Button icon="tabler:skip-back" variant="plain" onClick={lastMusic} />
      <Button
        icon={
          isPlaying ? 'tabler:player-pause-filled' : 'tabler:player-play-filled'
        }
        variant={!isPlaying ? 'primary' : 'plain'}
        onClick={() => {
          togglePlay(currentMusic).catch(err => {
            toast.error(`Failed to play music. Error: ${err}`)
          })
        }}
      />
      <Button icon="tabler:skip-forward" variant="plain" onClick={nextMusic} />
      {(isFull || !isWidget) && (
        <Button
          icon="uil:repeat"
          variant={isRepeat ? 'tertiary' : 'plain'}
          onClick={() => {
            setIsRepeat(!isRepeat)
            if (!isRepeat) setIsShuffle(false)
          }}
        />
      )}
    </Flex>
  )
}
