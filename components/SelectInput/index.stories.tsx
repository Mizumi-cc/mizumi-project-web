import SelectInput from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { COUNTRIES } from "../../utils/constants"

export default {
  title: 'Components/SelectInput',
  component: SelectInput
} as ComponentMeta<typeof SelectInput>

const Template: ComponentStory<typeof SelectInput> = (args) => <SelectInput {...args} />

export const Default = Template.bind({})
Default.args = {
  onChange() {},
  options: COUNTRIES,
  selectedOption: undefined
}
