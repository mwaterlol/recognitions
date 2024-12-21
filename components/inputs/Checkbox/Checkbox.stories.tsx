import type { Meta, StoryObj } from '@storybook/react'

import { Paper, Text } from '@mantine/core'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Libs/Inputs/Checkbox',
  component: Checkbox,
  argTypes: {
    name: { control: { disable: true } },
    ref: { control: { disable: true } },
    key: { control: { disable: true } },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

const MainDecorator = (Story: React.FC) => (
  <Paper bg={'gray.0'} p={30} w={360}>
    <Story />
  </Paper>
)

const schema = z.object({
  rememberMe: z.boolean(),
})

type Schema = z.infer<typeof schema>

export const Default: Story = {
  decorators: [MainDecorator],
  render: () => {
    const form = useForm<Schema>({
      resolver: zodResolver(schema),
      mode: 'onChange',
      defaultValues: {
        rememberMe: false,
      },
    })

    const watchRememberMe = form.watch('rememberMe')

    return (
      <FormProvider {...form}>
        <Text>Input value: {JSON.stringify(watchRememberMe)}</Text>
        <Checkbox label="remember me" name="rememberMe" />
      </FormProvider>
    )
  },
}
