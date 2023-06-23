import UserTransactions from "."
import { StoryFn, Meta } from "@storybook/react"

export default {
  title: 'Components/UserTransactions',
  component: UserTransactions,
} as Meta

const Template: StoryFn<typeof UserTransactions> = (args) => <UserTransactions {...args} />

export const Default = Template.bind({})
Default.args = {
  orders: [
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
