import { mount } from '@vue/test-utils'
import FormField from "../src/form-field"

export const createInstance = (options) => {
  const defaultMethods = {}
  const wrapper = mount({
    ...options,
    components: {
      "form-field": FormField,
    },
    methods: {
      ...defaultMethods,
      ...(options.methods)
    },
  })
  const vm = wrapper.vm.$children[0]

  return {
    wrapper,
    vm
  }
}

export const createElInputTestUtils = (wrapper) => {
  // input DOM Wrapper
  const inputElm = wrapper.find('input')
  // input DOM
  const nativeInput = inputElm.element
  let hasInput = false

  // 检查是否存在input
  const checkElInput = () => {
    if (hasInput) return
    const exists = inputElm.exists()
    hasInput = exists
    expect(exists).toBe(true)
  }

  // 检查input的值是否与传入的值相等
  const expectInputValue = (value) => expect(nativeInput.value).toBe(value)

  return {
    expectInputValue,
    /**
     * 为el-input赋值，检查input的值是否与传入的值相等
     */
    setValueToBe(value) {
      checkElInput()

      wrapper.find("input").setValue(value)
      expectInputValue(`${value}`)
    },
    /**
     * 检查input的默认值是否与传入的值相等
     */
    expectDefaultToBe(defaultValue) {
      checkElInput()

      expectInputValue(`${defaultValue}`)
    },

    expectDisabledToBe(disabled = false) {
      checkElInput()

      expect(inputElm.element.disabled).toBe(disabled)
    }
  }
}
