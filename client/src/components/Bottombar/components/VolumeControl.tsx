import { useForgeMutation } from '@lifeforge/api'
import { Box, Button, Flex, Icon, toast } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import { useMusicContext } from '@/providers/MusicProvider'

export default function VolumeControl() {
  const { audio, currentMusic, setCurrentMusic, setVolume, volume } =
    useMusicContext()

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
      align="center"
      display={{ base: 'none', xl: 'flex' }}
      gap="sm"
      justify="end"
      width="33.3333%"
    >
      <Button
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
      <Flex align="center">
        <Icon color="muted" icon="tabler:volume" mr="md" />
        <Box
          asChild
          bg={{ base: 'bg-200', dark: 'bg-700' }}
          height="0.25rem"
          overflow="hidden"
          r="full"
          width="8rem"
        >
          <input
            className="secondary"
            max="100"
            style={{ cursor: 'pointer' }}
            type="range"
            value={volume}
            onChange={e => {
              audio.current.volume = +e.target.value / 100
              setVolume(+e.target.value)
            }}
          />
        </Box>
      </Flex>
    </Flex>
  )
}
