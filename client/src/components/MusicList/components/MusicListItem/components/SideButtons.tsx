import { useCallback } from 'react'

import { useForgeMutation } from '@lifeforge/api'
import {
  Box,
  ConfirmationModal,
  ContextMenu,
  ContextMenuItem,
  Flex,
  Icon,
  Transition,
  colorWithOpacity,
  toast,
  useModalStore
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import { type MusicEntry, useMusicContext } from '@/providers/MusicProvider'

import UpdateMusicModal from '../../../../modals/UpdateMusicModal'

function SideButtons({ music }: { music: MusicEntry }) {
  const { stopMusic, currentMusic } = useMusicContext()
  const { open } = useModalStore()

  const toggleFavouriteMutation = useForgeMutation(
    forgeAPI.entries.toggleFavourite.input({ id: music.id }),
    {
      action: music.is_favourite ? 'unfavourite' : 'favourite',
      queryKey: forgeAPI.entries.key,
      onSuccess: () => {
        toast.success(
          music.is_favourite
            ? `Removed "${music.name}" from favourites`
            : `Added "${music.name}" to favourites`
        )
      }
    }
  )

  const handleUpdateEntry = useCallback(() => {
    open(UpdateMusicModal, {
      initialData: music
    })
  }, [music])

  const deleteEntryMutation = useForgeMutation(
    forgeAPI.entries.remove.input({ id: music.id }),
    {
      action: 'delete',
      queryKey: forgeAPI.entries.key,
      onSuccess: () => {
        if (currentMusic?.id === music.id) {
          stopMusic()
        }
      }
    }
  )

  const handleDeleteEntry = useCallback(() => {
    open(ConfirmationModal, {
      title: 'Delete Music',
      description: `Are you sure you want to delete "${music.name}"?`,
      onConfirm: async () => {
        await deleteEntryMutation.mutateAsync(undefined)
      }
    })
  }, [music])

  return (
    <Flex
      align="center"
      flexShrink="0"
      justify="end"
      minWidth="0"
      width={{ base: 'auto', sm: '16.6667%' }}
    >
      <Transition duration={150} property="all">
        <Box
          as="button"
          bg={{ hover: 'bg-100', darkHover: colorWithOpacity('bg-800', '50%') }}
          p="md"
          r="lg"
          onClick={() => {
            toggleFavouriteMutation.mutateAsync(undefined)
          }}
        >
          <Icon
            color={
              music.is_favourite
                ? { base: 'red-500', hover: 'red-600' }
                : { base: 'bg-500', hover: 'bg-800', darkHover: 'bg-50' }
            }
            icon={!music.is_favourite ? 'tabler:heart' : 'tabler:heart-filled'}
          />
        </Box>
      </Transition>
      <ContextMenu>
        <ContextMenuItem
          icon="tabler:download"
          label="Download"
          onClick={() => {
            const a = document.createElement('a')

            a.href = forgeAPI.getMedia({ key: music.file })
            a.download = music.name
            a.click()
          }}
        />
        <ContextMenuItem
          icon="tabler:pencil"
          label="Edit"
          onClick={handleUpdateEntry}
        />
        <ContextMenuItem
          dangerous
          icon="tabler:trash"
          label="Delete"
          onClick={handleDeleteEntry}
        />
      </ContextMenu>
    </Flex>
  )
}

export default SideButtons
