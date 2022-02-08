import { InputNumber } from "element-ui";
import { createInstance } from '../src/common';
import { createElInputNumberTestUtils } from '../src/input-number';

const createElInputInstance = (options = {}) => createInstance({
    components: {
      'el-input-number': InputNumber,
    },
    ...options,
  })

describe('createElInputNumberTestUtils', () => {
  it('getValue', () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>`,
      data() {
        return {
          num: 1
        }
      }
    })
    const { getValue } = createElInputNumberTestUtils(wrapper)
    expect(getValue()).toBe(1)
  });

  it('setValue', async () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>`,
      data() {
        return {
          num: 7
        }
      }
    })
    const { getValue, setValue } = createElInputNumberTestUtils(wrapper)
    await setValue(9)
    expect(getValue()).toBe(9)
  });

  it('increase', async () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>`,
      data() {
        return {
          num: 8
        }
      }
    })
    const { getValue, increase, listen } = createElInputNumberTestUtils(wrapper)
    const onInput = jest.fn()
    listen('input', onInput)

    await increase()
    expect(onInput).toBeCalledTimes(2)
    expect(getValue()).toBe(9)

    await increase()
    expect(onInput).toBeCalledTimes(4)
    expect(getValue()).toBe(10)

    await increase()
    await increase()
    expect(getValue()).toBe(10)
    expect(onInput).toBeCalledTimes(4)
  });

  it('decrease', async () => {
    const { wrapper } = createElInputInstance({
      template: `<el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>`,
      data() {
        return {
          num: 3
        }
      }
    })
    const { getValue, decrease, listen } = createElInputNumberTestUtils(wrapper)
    const onInput = jest.fn()
    listen('input', onInput)

    await decrease()
    expect(onInput).toBeCalledTimes(2)
    expect(getValue()).toBe(2)

    await decrease()
    expect(onInput).toBeCalledTimes(4)
    expect(getValue()).toBe(1)

    await decrease()
    await decrease()
    expect(getValue()).toBe(1)
    expect(onInput).toBeCalledTimes(4)
  });
});