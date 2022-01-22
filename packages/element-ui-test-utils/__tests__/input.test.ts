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


  it('setValue', () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input v-model="inputValue"></el-input>`,
      data() {
        return {
          inputValue: ""
        }
      }
    })

    const { setValue, getValue } = createElInputTestUtils(wrapper)
    expect(getValue()).toBe("")
    setValue("Hello World")
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


  it('clear', async  () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input v-model="inputValue" clearable></el-input>`,
      data() {
        return {
          inputValue: "Hello World"
        }
      },
    })

    const { clear, getValue } = createElInputTestUtils(wrapper)
    expect(getValue()).toBe("Hello World")
    await clear()
    expect(getValue()).toBe("")
  })
});
