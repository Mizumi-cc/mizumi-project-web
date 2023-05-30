import BankInfoInput from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Components/BankInfoInput',
  component: BankInfoInput,
} as ComponentMeta<typeof BankInfoInput>

const Template: ComponentStory<typeof BankInfoInput> = (args) => <BankInfoInput {...args} />

export const Default = Template.bind({})
Default.args = {
  banks: [
    {
      "name": "ABSA BANK GHANA LIMITED",
      "shortName": "ABSA",
      "bankCode": "300303"
    },
    {
      "name": "ACCESS BANK LTD",
      "shortName": "ACCESS",
      "bankCode": "300329"
    },
    {
      "name": "AGRICULTURAL DEVELOPMENT BANK",
      "shortName": "ADB",
      "bankCode": "300307"
    },
    {
      "name": "AIRTELTIGO MONEY",
      "shortName": "AIRTELTIGO",
      "bankCode": "300592"
    },
    {
      "name": "ARB APEX BANK LIMITED",
      "shortName": "ARB APEX",
      "bankCode": "300306"
    },
    {
      "name": "BANK OF AFRICA",
      "shortName": "BANK OF AFRICA",
      "bankCode": "300320"
    },
    {
      "name": "BANK OF GHANA",
      "shortName": "BOG",
      "bankCode": "300328"
    },
  ],
  selectedBank: { name: 'ABSA BANK GHANA LIMITED', shortName: 'ABSA', bankCode: '300303' },
  accountNumber: '1234567890',
  accountName: 'John Doe',
  onBankChange: () => {},
  onAccountNumberChange: () => {},
  onAccountNameChange: () => {},
}
