import type Vue from "vue"
import type { Wrapper } from "@vue/test-utils"

type ValueType = string | number

export const createElInputTestUtils = (wrapper: Wrapper<Vue>) => {
  const inputWrapper = wrapper.find<HTMLInputElement>('input');
  const nativeInput = inputWrapper.element
  const elInputWrapper = wrapper.findComponent({ name: 'el-input' })

  let hasInput = false

  // 检查是否存在input
  const checkElInput = () => {
    if (hasInput) return
    const exists = inputWrapper.exists()
    hasInput = exists
    expect(exists).toBe(true)
  }

  // 检查input的值是否与传入的值相等
  const expectValue = (value: string | number) => expect(nativeInput.value).toBe(value)
  // 监听el-input的事件
  const listen = (eventName: string, cb: () => void) => elInputWrapper.vm.$on(eventName, cb)

  return {
    getValue: () => nativeInput.value,
    setValue(value: ValueType) {
      checkElInput()

      inputWrapper.setValue(value)
    },
    getElInputVm: () => elInputWrapper.vm as any,
    expectValue,
    listen,
    /**
     * 检查input的默认值是否与传入的值相等
     */
    expectDefaultValueToBe(defaultValue: ValueType) {
      checkElInput()

      expectValue(`${defaultValue}`)
    },
    /**
     * 为el-input赋值，检查input的值是否与传入的值相等
     */
    setValueAndToBe(value: ValueType) {
      checkElInput()

      wrapper.find("input").setValue(value)
      expectValue(`${value}`)
    },

    expectDisabledToBe(disabled = false) {
      checkElInput()

      expect(inputWrapper.element.disabled).toBe(disabled)
    },

    async clear() {
      const clearMock = jest.fn()
      // 如果值为空，无法触发clear事件
      expect(nativeInput.value).not.toBe("")

      wrapper.trigger("mouseenter")
      await wrapper.vm.$nextTick()

      listen("clear", clearMock)
      const clearIconWrapper = wrapper.find<HTMLElement>(".el-input__clear")
      clearIconWrapper.trigger("click");
      await wrapper.vm.$nextTick()

      expect(clearMock).toBeCalled()
      expectValue("")
    },

    expectDisabled(disabled: boolean) {
      expect(nativeInput.disabled).toBe(disabled)
    }
  }
}