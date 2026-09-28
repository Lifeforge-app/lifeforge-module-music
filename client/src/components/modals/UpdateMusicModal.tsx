import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useForgeMutation } from '@lifeforge/api'
import { FormModal, TextField, createDefaultValues, toast } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

import type { MusicEntry } from '../../providers/MusicProvider'

const schema = z.object({
  name: z.string().min(1, 'Required'),
  author: z.string().min(1, 'Required')
})

function UpdateMusicModal({
  data: { initialData },
  onClose
}: {
  data: {
    initialData?: MusicEntry
  }
  onClose: () => void
}) {
  const updateMutation = useForgeMutation(
    forgeAPI.entries.update.input({ id: initialData?.id || '' }),
    {
      action: 'update',
      queryKey: forgeAPI.entries.key,
      onSuccess: () => onClose()
    }
  )

  const form = useForm({
    defaultValues: {
      ...createDefaultValues(schema),
      name: initialData?.name ?? '',
      author: initialData?.author ?? ''
    },
    resolver: zodResolver(schema)
  })

  async function parseAi() {
    try {
      const { name, author } = form.getValues()

      const response = await forgeAPI.youtube.parseMusicNameAndAuthor.mutate({
        title: name || '',
        uploader: author || ''
      })

      if (!response) {
        toast.error('Failed to parse music name and author')

        return
      }

      form.setValue('name', response.name || '', { shouldValidate: true })
      form.setValue('author', response.author || '', { shouldValidate: true })
    } catch (error) {
      toast.error(
        `Failed to parse music name and author: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  return (
    <FormModal
      form={form}
      submissionConfig={{
        template: 'update',
        handler: updateMutation.mutateAsync
      }}
      uiConfig={{
        icon: 'tabler:pencil',
        namespace: 'apps.music',
        title: 'updateMusic',
        onClose
      }}
    >
      <TextField
        required
        actionButtonProps={{ icon: 'mage:stars-c', onClick: parseAi }}
        control={form.control}
        icon="tabler:music"
        label="Music Name"
        name="name"
        placeholder="John Doe's Music"
      />
      <TextField
        required
        control={form.control}
        icon="tabler:user"
        label="Music Author"
        name="author"
        placeholder="John Doe"
      />
    </FormModal>
  )
}

export default UpdateMusicModal
