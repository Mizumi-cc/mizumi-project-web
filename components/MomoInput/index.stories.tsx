import MomoInput from "."
import { Meta, StoryFn } from "@storybook/react"

export default {
  title: 'Components/MomoInput',
  component: MomoInput,
} as Meta

const Template: StoryFn<typeof MomoInput> = (args) => <MomoInput {...args} />

export const Default = Template.bind({})
Default.args = {
  phone: '0123456789',
  onPhoneChange: () => {},
  name: 'John Mensah',
  onNameChange: () => {},
}
