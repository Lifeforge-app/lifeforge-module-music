import {
  Card,
  ContextMenuItem,
  FAB,
  Flex,
  Stack,
  useModalStore
} from '@lifeforge/ui'

import { useMusicContext } from '@/providers/MusicProvider'

import YoutubeDownloaderModal from '../modals/YoutubeDownloaderModal'
import ControlButtons from './components/ControlButtons'
import DurationSlider from './components/DurationSlider'
import MusicInfo from './components/MusicInfo'
import VolumeControl from './components/VolumeControl'

function BottomBar() {
  const { open } = useModalStore()
  const { currentMusic } = useMusicContext()

  return (
    <Stack bottom="1rem" left="0" position="absolute" width="100%">
      <FAB visibilityBreakpoint="md">
        <ContextMenuItem
          icon="tabler:brand-youtube"
          label="Download from YouTube"
          onClick={() => open(YoutubeDownloaderModal, {})}
        />
      </FAB>
      {currentMusic !== null && (
        <Card
          shadow
          bg={{ base: 'bg-50', dark: 'bg-800' }}
          gap="md"
          justify="between"
          p="md"
          r="lg"
          width="100%"
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 'sm', md: 'xl' }}
            justify="between"
            width="100%"
          >
            <MusicInfo />
            <ControlButtons />
            <VolumeControl />
          </Flex>
          <DurationSlider />
        </Card>
      )}
    </Stack>
  )
}

export default BottomBar
