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
    { label: 'Ghana', value: 'Ghana' },
    { label: 'Nigeria', value: 'Nigeria' },
    { label: 'Kenya', value: 'Kenya' },
    { label: 'South Africa', value: 'South Africa' }
  ],
  selectedOption: undefined
}
