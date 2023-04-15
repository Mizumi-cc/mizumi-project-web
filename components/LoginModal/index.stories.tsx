import LoginModal from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Components/LoginModal',
  component: LoginModal,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof LoginModal>

const Template: ComponentStory<typeof LoginModal> = (args) => <LoginModal {...args} />

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  onClose: () => {}
}
