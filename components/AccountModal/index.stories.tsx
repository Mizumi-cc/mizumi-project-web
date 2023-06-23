import AccountModal from "."
import { Meta, StoryFn } from "@storybook/react"

export default {
  title: 'Components/AccountModal',
  component: AccountModal,
} as Meta

const Template: StoryFn<typeof AccountModal> = (args) => <AccountModal {...args} />

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  onClose: () => {},
}
