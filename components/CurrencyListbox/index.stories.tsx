import CurrencyListbox from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Compoennts/CurrencyListbox',
  component: CurrencyListbox,
} as ComponentMeta<typeof CurrencyListbox>

const Template: ComponentStory<typeof CurrencyListbox> = (args) => <CurrencyListbox {...args} />

export const Default = Template.bind({})
Default.args = {
  currencies: [
    { name: 'Ghana Cedi', symbol: 'GHS', image: '/assets/img/cedi.png' },
    { name: 'USDC', symbol: 'USDC', image: '/assets/img/usdc.png' },
    { name: 'USDT', symbol: 'USDT', image: '/assets/img/usdt.png' },
  ]
}

Default.parameters = {
  backgrounds: {
    default: 'light'
  }
}
