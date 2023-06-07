import SelectInput from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Components/SelectInput',
  component: SelectInput
} as ComponentMeta<typeof SelectInput>

const Template: ComponentStory<typeof SelectInput> = (args) => <SelectInput {...args} />

export const Default = Template.bind({})
Default.args = {
  onChange() {},
  options: [
    { code: 'AGC', label: 'AGC', value: 'AGC'},
    { code: 'ABC', label: 'ABC',  value: 'ABC'}
  ],
  selectedOption: { code: 'AGC', label: 'AGC', value: 'AGC'}
}
