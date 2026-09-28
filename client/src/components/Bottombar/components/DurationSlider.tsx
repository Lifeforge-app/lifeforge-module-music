/* eslint-disable react-compiler/react-compiler */
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { Box, Flex, Text } from '@lifeforge/ui'

import { useMusicContext } from '@/providers/MusicProvider'

dayjs.extend(duration)

function DurationSlider() {
  const { audio, currentDuration, setCurrentDuration, currentMusic } =
    useMusicContext()

  if (currentMusic === null) {
    return <></>
  }

  return (
    <Flex align="center" gap="sm" width="100%">
      <Text color="muted" size="sm" style={{ marginTop: '-0.125rem' }}>
        {dayjs
          .duration(+currentDuration, 'seconds')
          .format(+currentDuration >= 3600 ? 'H:mm:ss' : 'm:ss')}
      </Text>
      <Box
        asChild
        bg={{ base: 'bg-200', dark: 'bg-700' }}
        height="0.25rem"
        overflow="hidden"
        r="full"
        width="100%"
      >
        <input
          className="main"
          max={currentMusic.duration}
          style={{
            backgroundSize: `${
              (+currentDuration / +currentMusic.duration) * 100
            }% 100%`,
            cursor: 'pointer'
          }}
          type="range"
          value={currentDuration}
          onChange={e => {
            audio.current.currentTime = +e.target.value
            setCurrentDuration(+e.target.value)
          }}
        />
      </Box>
      <Text color="muted" size="sm" style={{ marginTop: '-0.125rem' }}>
        {dayjs
          .duration(+currentMusic.duration, 'seconds')
          .format(+currentMusic.duration >= 3600 ? 'H:mm:ss' : 'm:ss')}
      </Text>
    </Flex>
  )
}

export default DurationSlider
