import Toast from "."
import { Meta, StoryFn } from "@storybook/react"

export default {
  title: 'Components/Toast',
  component: Toast,
} as Meta

const Template: StoryFn<typeof Toast> = (args) => <Toast {...args} />

export const Default = Template.bind({})
Default.args = {
  messages: [
    { text: 'This is a success message', type: 'success' },
    { text: 'This is an error message', type: 'error' },
    { text: 'This is an info message', type: 'info' },
  ]
}