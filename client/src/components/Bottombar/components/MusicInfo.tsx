import { useForgeMutation } from '@lifeforge/api'
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  colorWithOpacity,
  toast
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import { useMusicContext } from '@/providers/MusicProvider'

export default function MusicInfo() {
  const { currentMusic, setCurrentMusic, isPlaying } = useMusicContext()

  const toggleFavouriteMutation = useForgeMutation(
    forgeAPI.entries.toggleFavourite.input({ id: currentMusic?.id || '' }),
    {
      action: currentMusic?.is_favourite ? 'unfavourite' : 'favourite',
      queryKey: forgeAPI.entries.key,
      onSuccess: () => {
        if (!currentMusic) return

        setCurrentMusic(prev => {
          if (!prev) return null

          return { ...prev, is_favourite: !prev.is_favourite }
        })
        toast.success(
          currentMusic.is_favourite
            ? `Removed "${currentMusic.name}" from favourites`
            : `Added "${currentMusic.name}" to favourites`
        )
      }
    }
  )

  if (currentMusic === null) {
    return <></>
  }

  return (
    <Flex
      justify="between"
      minWidth="0"
      width={{ base: '100%', md: '33.3333%' }}
    >
      <Flex align="center" minWidth="0" width="100%">
        <Flex
          align="center"
          bg={colorWithOpacity('custom-500', '20%')}
          flexShrink="0"
          height="3rem"
          justify="center"
          r="md"
          width="3rem"
        >
          <Icon
            color="primary"
            icon="tabler:disc"
            size="1.875rem"
            style={
              isPlaying
                ? { animation: 'rotation 1s linear infinite' }
                : undefined
            }
          />
        </Flex>
        <Box minWidth="0" ml="md" width="100%">
          <Text truncate as="p" weight="semibold">
            {currentMusic.name}
          </Text>
          <Text as="p" color="muted" size="sm">
            {currentMusic.author}
          </Text>
        </Box>
      </Flex>
      <Button
        display={{ base: 'flex', md: 'none' }}
        icon={
          currentMusic.is_favourite ? 'tabler:heart-filled' : 'tabler:heart'
        }
        iconProps={{
          color: currentMusic.is_favourite
            ? { base: 'red-500', hover: 'red-600' }
            : { base: 'bg-500', hover: 'bg-800', darkHover: 'bg-50' }
        }}
        variant="plain"
        onClick={() => {
          toggleFavouriteMutation.mutateAsync(undefined)
        }}
      />
    </Flex>
  )
}
