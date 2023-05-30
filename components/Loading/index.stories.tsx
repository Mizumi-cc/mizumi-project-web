import Loading from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Components/Loading',
  component: Loading
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />

export const Default = Template.bind({})
