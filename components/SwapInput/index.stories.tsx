import SwapInput from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Components/SwapInput',
  component: SwapInput,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof SwapInput>

const Template: ComponentStory<typeof SwapInput> = (args) => <SwapInput {...args} />

export const Default = Template.bind({})
Default.args = {
  currencies: [
    { name: 'Ghana Cedi', symbol: 'GHS', image: '/assets/img/cedi.png' },
    { name: 'USDC', symbol: 'USDC', image: '/assets/img/usdc.png' },
    { name: 'USDT', symbol: 'USDT', image: '/assets/img/usdt.png' },
  ],
  onValueChange: () => {},
  onCurrencyChange: () => {},
  value: 0,
  dollarValue: 0,
  selectedCurrency: { name: 'Ghana Cedi', symbol: 'GHS', image: '/assets/img/cedi.png' }
}

Default.parameters = {
  backgrounds: {
    default: 'light'
  }
}
