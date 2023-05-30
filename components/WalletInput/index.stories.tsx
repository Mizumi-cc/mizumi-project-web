import WalletInput from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Components/WalletInput',
  component: WalletInput,
} as ComponentMeta<typeof WalletInput>

const Template: ComponentStory<typeof WalletInput> = (args) => <WalletInput {...args} />

export const Default = Template.bind({})
Default.args = {
  address: '0x1234567890',
  isValid: true,
  onChange: () => {},
}
