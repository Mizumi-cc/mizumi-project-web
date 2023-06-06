import ShowMoreMenu from "."
import { Meta, StoryFn } from "@storybook/react"

export default {
  title: 'Components/ShowMoreMenu',
  component: ShowMoreMenu
} as Meta

const Template: StoryFn<typeof ShowMoreMenu> = (args) => <ShowMoreMenu {...args} />

export const Default = Template.bind({})
Default.args = {
  options: [
    { title: 'Login', onClick: () => {}},
    { title: 'Register', onClick: () => {}}
  ]
}
