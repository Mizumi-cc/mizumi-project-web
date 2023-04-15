import CardCheckoutModal from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Compoennts/CardCheckoutModal',
  component: CardCheckoutModal
} as ComponentMeta<typeof CardCheckoutModal>

const Template: ComponentStory<typeof CardCheckoutModal>  = (args) => <CardCheckoutModal {...args} />

export const Default = Template.bind({})
Default.args = {
  onSubmit: (data: any) => {},
  isOpen: true,
  onClose: () => {},
}