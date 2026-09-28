import { useRef } from 'react'
import { Link, useNavigate } from 'react-router'

import type { WidgetConfig } from '@lifeforge/configs'
import {
  Box,
  Button,
  EmptyStateScreen,
  Flex,
  Icon,
  Text,
  Widget,
  colorWithOpacity
} from '@lifeforge/ui'

import ControlButtons from '@/components/Bottombar/components/ControlButtons'
import { useMusicContext } from '@/providers/MusicProvider'

export default function MusicPlayer() {
  const { currentMusic, isPlaying } = useMusicContext()
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Widget
      ref={ref}
      actionComponent={
        <Button
          as={Link}
          icon="tabler:chevron-right"
          p="sm"
          to="/music"
          variant="plain"
        />
      }
      icon="tabler:music"
      title="Music Player"
    >
      <Flex direction="column" flex="1" minHeight="0">
        {currentMusic !== null ? (
          <>
            <Flex
              shadow
              align="center"
              bg={{
                base: colorWithOpacity('bg-100', '50%'),
                dark: colorWithOpacity('bg-800', '50%')
              }}
              flex="1"
              justify="center"
              minHeight="0"
              py="xl"
              r="md"
              width="100%"
            >
              <Box aspectRatio="1" width="50%">
                <Icon
                  color={
                    isPlaying ? 'primary' : { base: 'bg-300', dark: 'bg-700' }
                  }
                  icon="tabler:disc"
                  size="100%"
                  style={
                    isPlaying
                      ? { animation: 'rotation 1s linear infinite' }
                      : undefined
                  }
                />
              </Box>
            </Flex>
            <Flex align="center" direction="column" gap="xs" my="md">
              <Text
                align="center"
                as="h2"
                lineClamp={2}
                size="lg"
                weight="semibold"
              >
                {currentMusic?.name}
              </Text>
              <Text align="center" as="p" color="muted" lineClamp={2}>
                {currentMusic?.author}
              </Text>
            </Flex>
            <ControlButtons
              isWidget
              isFull={(ref.current?.getBoundingClientRect().width ?? 0) > 300}
            />
          </>
        ) : (
          <EmptyStateScreen
            smaller
            CTAButtonProps={{
              icon: 'tabler:music',
              mt: 'md',
              onClick: () => {
                navigate('/music')
              },
              children: 'Select Music'
            }}
            icon="tabler:disc-off"
            message={{
              id: 'music',
              tKey: 'widgets.musicPlayer'
            }}
          />
        )}
      </Flex>
    </Widget>
  )
}

export const config: WidgetConfig = {
  id: 'musicPlayer',
  icon: 'tabler:music',
  minW: 2,
  minH: 4
}
