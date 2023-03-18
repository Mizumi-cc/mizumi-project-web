import Logo from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {
  image: {
    black: '/assets/img/mizumi-black.svg',
    white: '/assets/img/mizumi-white.svg'
  }
}

Default.parameters = {
  backgrounds: {
    default: 'light'
  }
}
