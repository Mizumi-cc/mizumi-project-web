import { Connection, PublicKey } from "@solana/web3.js"
import TokenBalance from "."
import { Meta, StoryFn } from "@storybook/react"

export default {
  title: 'Components/TokenBalance',
  component: TokenBalance,
} as Meta

const Template: StoryFn<typeof TokenBalance>  = (args) => <TokenBalance {...args} />

export const Default = Template.bind({})
Default.args = {
  connection: new Connection('https://api.mainnet-beta.solana.com'),
  mintAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
  symbol: 'USDC',
  walletAddress: new PublicKey('CEF6JJn6Mu8u1u2AaPVfQ14kbdNs9kmVxktmGa7kpL3z')
}
