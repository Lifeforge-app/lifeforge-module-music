import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import humanNumber from 'human-number'

import {
  Bordered,
  Box,
  Flex,
  Icon,
  Text,
  colorWithOpacity,
  surface
} from '@lifeforge/ui'

dayjs.extend(duration)
dayjs.extend(relativeTime)

function VideoInfo({ videoInfo }: { videoInfo: any }) {
  return (
    <Flex
      shadow
      align="center"
      bg={surface.light}
      direction={{ base: 'column', md: 'row' }}
      gap="lg"
      p="md"
      r="md"
      width="100%"
    >
      <Bordered
        borderColor="bg-800"
        borderWidth="1px"
        flexShrink="0"
        overflow="hidden"
        position="relative"
        r="md"
        width={{ md: '16rem' }}
      >
        <img
          alt=""
          src={videoInfo.thumbnail}
          style={{ height: '100%', objectFit: 'cover', width: '100%' }}
        />
        <Text
          as="p"
          bg={colorWithOpacity('bg-900', '70%')}
          color="bg-50"
          position="absolute"
          px="xs"
          py="xs"
        >
          {dayjs
            .duration(+videoInfo.duration, 'second')
            .format(+videoInfo.duration > 3600 ? 'H:mm:ss' : 'm:ss')}
        </Text>
      </Bordered>
      <Box>
        <Text as="h2" lineClamp={2} size="2xl" weight="medium">
          {videoInfo.title}
        </Text>
        <Text as="p" color="primary" mt="xs">
          {videoInfo.uploader}
        </Text>
        {videoInfo.uploadDate !== undefined && (
          <Text as="p" color="muted" mt="md">
            {humanNumber(+videoInfo.viewCount, n =>
              Number.parseFloat(`${n}`).toFixed(2)
            )}{' '}
            views • {dayjs(videoInfo.uploadDate, 'YYYYMMDD').fromNow()}
          </Text>
        )}
        {videoInfo.likeCount !== undefined && (
          <Flex align="center" gap="xs" mt="xs">
            <Icon icon="uil:thumbs-up" />{' '}
            <Text color="muted">
              {humanNumber(+videoInfo.likeCount, n =>
                Number.parseFloat(`${n}`).toFixed(2)
              )}{' '}
              likes
            </Text>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}

export default VideoInfo
