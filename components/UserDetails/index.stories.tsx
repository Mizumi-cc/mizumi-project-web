import UserDetails from "."
import { Meta, StoryFn } from "@storybook/react"

export default {
  title: 'Components/UserDetails',
  component: UserDetails,
} as Meta

const Template: StoryFn<typeof UserDetails> = (args) => <UserDetails {...args} />

export const Default = Template.bind({})
Default.args = {
  onEditClick: () => {},
}
