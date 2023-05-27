import VeryfyingPayment from "."
import { Meta, StoryFn } from "@storybook/react"

export default {
  title: 'Components/VeryfyingPayment',
  component: VeryfyingPayment,
} as Meta

const Template: StoryFn<typeof VeryfyingPayment> = (args) => <VeryfyingPayment {...args} />

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  onClose: () => {},
  verified: false,
}