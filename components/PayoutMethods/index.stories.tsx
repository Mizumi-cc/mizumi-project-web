import PayoutMethods from "."
import { Meta, StoryFn } from "@storybook/react"

export default {
  title: 'Components/PayoutMethods',
  component: PayoutMethods,
} as Meta

const Template: StoryFn<typeof PayoutMethods> = (args) => <PayoutMethods {...args} />

export const Default = Template.bind({})
Default.args = {
  onSubmit: () => {},
}
