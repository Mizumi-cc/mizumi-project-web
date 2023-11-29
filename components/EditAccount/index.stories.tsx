import EditAccount from "."
import { StoryFn, Meta } from "@storybook/react"

export default {
  title: 'Components/EditAccount',
  component: EditAccount,
} as Meta

const Template: StoryFn<typeof EditAccount> = (args) => <EditAccount {...args} />

export const Default = Template.bind({})
