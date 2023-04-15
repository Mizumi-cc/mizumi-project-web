import SwapBox from '.'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/SwapBox',
  component: SwapBox,
} as ComponentMeta<typeof SwapBox>

const Template: ComponentStory<typeof SwapBox> = (args) => <SwapBox {...args} />

export const Default = Template.bind({})
Default.args = {
  busy: false,
  onSubmit: (data: any) => {},
}
