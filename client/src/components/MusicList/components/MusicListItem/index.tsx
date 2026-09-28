import dayjs from 'dayjs'

import { Box, Card, Flex, Text } from '@lifeforge/ui'

import type { MusicEntry } from '@/providers/MusicProvider'

import PlayStateIndicator from './components/PlayStateIndicator'
import SideButtons from './components/SideButtons'

function formatDuration(duration: string): string {
  return dayjs
    .duration(+duration, 'second')
    .format(+duration > 3600 ? 'H:mm:ss' : 'm:ss')
}

function MusicListItem({ music }: { music: MusicEntry }) {
  return (
    <Card align="center" direction="row" p="sm">
      <Flex
        align="center"
        flexShrink={{ sm: '0' }}
        gap="sm"
        minWidth="0"
        width={{ base: '100%', sm: '58.3333%', lg: '41.6667%' }}
      >
        <PlayStateIndicator music={music} />
        <Box minWidth="0" width="100%">
          <Text truncate as="p" pr="xl">
            {music.name}
          </Text>
          <Text
            truncate
            as="p"
            color="muted"
            display={{ base: 'block', md: 'none' }}
            size="sm"
          >
            {music.author} <Text as="span">•</Text>{' '}
            {formatDuration(music.duration)}
          </Text>
        </Box>
      </Flex>
      <Box display={{ base: 'none', lg: 'block' }} minWidth="0" width="25%">
        <Text truncate as="p" color="muted" pr="xl">
          {music.author}
        </Text>
      </Box>
      <Box
        display={{ base: 'none', sm: 'block' }}
        minWidth="0"
        width={{ base: '25%', lg: '16.6667%' }}
      >
        <Text color="muted">{formatDuration(music.duration)}</Text>
      </Box>
      <SideButtons music={music} />
    </Card>
  )
}

export default MusicListItem
