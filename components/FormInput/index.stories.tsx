import FormInput from "."
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: 'Components/FormInput',
  component: FormInput,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof FormInput>

const Template: ComponentStory<typeof FormInput> = (args) => <FormInput {...args} />

export const Default = Template.bind({})
Default.args = {
  type: 'text',
  placeholder: 'Enter your name',
  value: '',
  onChange: () => {},
  onBlur: () => {},
  errors: {},
  label: 'Name'
}