import PaymentStatusModal from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Components/PaymentStatusModal',
  component: PaymentStatusModal,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof PaymentStatusModal>

const Template: ComponentStory<typeof PaymentStatusModal> = (args) => <PaymentStatusModal {...args} />

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  onClose: () => {},
  status: 'success',
  order: null
}
