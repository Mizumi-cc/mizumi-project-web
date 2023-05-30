import RatesBox from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: "Components/RatesBox",
  component: RatesBox,
} as ComponentMeta<typeof RatesBox>


const Template: ComponentStory<typeof RatesBox> = (args) => <RatesBox {...args} />

export const Default = Template.bind({})
Default.args = {
  usdcRate: 1,
  ghsRate: 1,
  usdtRate: 1,
}