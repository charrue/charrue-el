import { Input } from "element-ui"
import { createInstance } from "../src/common";
import { createElInputTestUtils } from "../src/input";

const createElInputInstance = (options = {}) => {
  return createInstance({
    components: {
      'el-input': Input
    },
    ...options,
  })
}

describe('createElInputTestUtils', () => {
  it('default', () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input v-model="inputValue"></el-input>`,
      data() {
        return {
          inputValue: "Hello World"
        }
      }
    })

    const { expectDefaultValueToBe } = createElInputTestUtils(wrapper)
    expectDefaultValueToBe("Hello World")
  })

  it('getValue', () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input v-model="inputValue"></el-input>`,
      data() {
        return {
          inputValue: "Hello World"
        }
      }
    })

    const { getValue } = createElInputTestUtils(wrapper)
    expect(getValue()).toBe("Hello World")
  })

  it('getElInputVm', () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input v-model="inputValue" clearable></el-input>`,
      data() {
        return {
          inputValue: "Hello World"
        }
      }
    })

    const { getElInputVm } = createElInputTestUtils(wrapper)
    expect(getElInputVm().value).toBe("Hello World")
    expect(getElInputVm().clearable).toBe(true)
  })

  it('set value', () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input v-model="inputValue"></el-input>`,
      data() {
        return {
          inputValue: ""
        }
      }
    })

    const { expectDefaultValueToBe, setValueAndToBe } = createElInputTestUtils(wrapper)
    expectDefaultValueToBe("")
    setValueAndToBe("Hello World")
  })

  it('clear', async  () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input v-model="inputValue" clearable></el-input>`,
      data() {
        return {
          inputValue: "Hello World"
        }
      },
    })
    const { clear } = createElInputTestUtils(wrapper)
    await clear()
  })

  it('disabled', () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input v-model="inputValue" disabled></el-input>`,
      data() {
        return {
          inputValue: "Hello World"
        }
      },
    })
    const { expectDisabled } = createElInputTestUtils(wrapper)
    expectDisabled(true)
  });


});
