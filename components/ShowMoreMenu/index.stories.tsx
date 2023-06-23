import ShowMoreMenu from "."
import { Meta, StoryFn } from "@storybook/react"
import { 
  ArrowRightOnRectangleIcon, 
  PencilSquareIcon,
} from "@heroicons/react/20/solid"

export default {
  title: 'Components/ShowMoreMenu',
  component: ShowMoreMenu
} as Meta

const Template: StoryFn<typeof ShowMoreMenu> = (args) => <ShowMoreMenu {...args} />

export const Default = Template.bind({})
Default.args = {
  options: [
    { title: 'Login', onClick: () => {}, icon: <ArrowRightOnRectangleIcon className="w-5 lg:w-7 pr-2"/>},
    { title: 'Register', onClick: () => {}, icon: <PencilSquareIcon className="w-5 lg:w-7 pr-2"/>}
  ]
}
