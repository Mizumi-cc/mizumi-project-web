import RegisterModal from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Components/RegisterModal',
  component: RegisterModal,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof RegisterModal>

const Template: ComponentStory<typeof RegisterModal> = (args) => <RegisterModal {...args} />

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  onClose: () => {}
}
