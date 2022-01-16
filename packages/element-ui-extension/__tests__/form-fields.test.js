import Vue from 'vue'
import ElementUI from 'element-ui'
import { mount } from '@vue/test-utils'
import FormField from "../src/form-field"

const createInstance = (options) => {
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

const createElInputTestUtils = (wrapper) => {
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


const createElDatePickerTestUtils = (wrapper) => {
  // input DOM Wrapper
  const inputElm = wrapper.find('.el-date-editor.el-input  input')
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

  // [年份，月份]
  const spans = document.querySelectorAll('.el-date-picker__header-label')
  const arrowLeftElm = document.querySelector(
    '.el-date-picker__prev-btn.el-icon-arrow-left'
  )
  const arrowRightElm = document.querySelector(
    '.el-date-picker__next-btn.el-icon-arrow-right'
  )


  return {
    checkElInput,
    expectInputValue,
    expectDefault() {
      const date = new Date()
      expect(spans[0].innerText).toBe(`${date.getFullYear()}`)
      expect(spans[1].innerText).toBe(`${date.getMonth() + 1}`)
    },
    nextMonth(count = 1) {
      if (arrowRightElm) {
        for (let i = 0; i < count; i++) {
          arrowRightElm.click()
        }
      }
    },
    prevMonth(count = 1) {
      if (arrowLeftElm) {
        for (let i = 0; i < count; i++) {
          arrowLeftElm.click()
        }
      }
    },
    clearValue() {}
  }
}

describe('FormField', () => {
  Vue.use(ElementUI)

  it('type:string', () => {
    const { wrapper } = createInstance({
      template: `<form-field v-model="inputValue" type="string"></form-field>`,
      data() {
        ""
      }
    })
    const { setValueToBe, expectDefaultToBe } = createElInputTestUtils(wrapper)

    setValueToBe("mu value")
    expectDefaultToBe("")
  })


  it('defaultValue', () => {
    const { wrapper } = createInstance({
      template: `<form-field v-model="inputValue" type="string"></form-field>`,
      data() {
        return {
          inputValue: "Hello World"
        }
      }
    })
    const { expectDefaultToBe } = createElInputTestUtils(wrapper)

    expectDefaultToBe("Hello World")
  })


  it('type:number', () => {
    const { wrapper } = createInstance({
      template: `<form-field v-model="inputValue" type="number"></form-field>`,
      data() {
        return {
          inputValue: 9
        }
      }
    })
    const { setValueToBe, expectDefaultToBe } = createElInputTestUtils(wrapper)

    expectDefaultToBe(9)
    setValueToBe(10)
    expect(wrapper.vm.inputValue).toBe(10)
  })
  it('type:date', () => {
    const { wrapper } = createInstance({
      template: `<form-field v-model="inputValue" type="date"></form-field>`,
      data() {
        return {
          inputValue: ''
        }
      }
    })

    console.log(Object.keys(wrapper.vm))
  })
});