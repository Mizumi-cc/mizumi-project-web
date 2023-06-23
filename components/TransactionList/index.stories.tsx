import TransactionList from "."
import { Meta, StoryFn } from "@storybook/react"

export default {
  title: 'Components/TransactionList',
  component: TransactionList,
} as Meta

const Template: StoryFn<typeof TransactionList> = (args) => <TransactionList {...args} />

export const Default = Template.bind({})
Default.args = {
  data: [
    {
      from: 'USDC',
      to: 'GHS',
      status: 'Completed',
      fiatRate: '5.75',
      tokenRate: '1',
      date: 'Aug 20, 2021',
      fromAmount: '₵1000',
      toAmount: '1000 USDC',
    }
  ]
}
