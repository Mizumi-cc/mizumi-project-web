import AccountMenu from "."
import { Meta, StoryFn } from "@storybook/react"

export default {
  title: 'Components/AccountMenu',
  component: AccountMenu
} as Meta

const Template: StoryFn<typeof AccountMenu> = (args) => <AccountMenu {...args} />

export const Default = Template.bind({})
Default.args = {
  options: [
    { title: 'Login', onClick: () => {}},
    { title: 'Register', onClick: () => {}}
  ]
}
