import SuccessModal from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Components/SuccessModal',
  component: SuccessModal,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof SuccessModal>

const Template: ComponentStory<typeof SuccessModal> = (args) => <SuccessModal {...args} />

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  onClose: () => {}
}
