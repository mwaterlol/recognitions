import { DropzoneProps as CustomDropzoneProps } from '@/components/Dropzone/types'

import { InputBaseProps } from '../types'

export type DropzoneProps = InputBaseProps &
  Omit<CustomDropzoneProps, 'onDrop'> & {
    label?: React.ReactNode
    withAsterisk?: boolean
  }
