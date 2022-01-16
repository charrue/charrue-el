import { Radio, RadioGroup, RadioButton } from "element-ui";
import { createInstance } from '../src/common';
import { createElRadioGroupTestUtils } from '../src/radio';

const createRadioInstance = (options = {}) => {
  return createInstance({
    components: {
      'el-radio': Radio,
      'el-radio-group': RadioGroup,
      'el-radio-button': RadioButton
    },
    ...options,
  })
}

describe('createElRadioGroupTestUtils', () => {

  it('getValue ', () => {
    const { wrapper } = createRadioInstance({
      template: `<el-radio-group v-model="radioValue">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>`,
      data() {
        return {
          radioValue: 3
        }
      }
    })

    const { getValue } = createElRadioGroupTestUtils(wrapper)
    expect(getValue()).toBe(3)
  });

  it('setValue ', async () => {
    const { wrapper } = createRadioInstance({
      template: `<el-radio-group v-model="radioValue">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>`,
      data() {
        return {
          radioValue: 3
        }
      }
    })

    const { getValue, setValue } = createElRadioGroupTestUtils(wrapper)
    await setValue(9)
    expect(getValue()).toBe(9)
  });

  it('getSelectedIndex ', async () => {
    const { wrapper } = createRadioInstance({
      template: `<el-radio-group v-model="radioValue">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>`,
      data() {
        return {
          radioValue: 3
        }
      }
    })

    const { getSelectedIndex } = createElRadioGroupTestUtils(wrapper)
    expect(getSelectedIndex()).toBe(0)
  });

  it('getSelectedRadioWrapper ', async () => {
    const { wrapper } = createRadioInstance({
      template: `<el-radio-group v-model="radioValue">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>`,
      data() {
        return {
          radioValue: 3
        }
      }
    })

    const { getSelectedRadioWrapper } = createElRadioGroupTestUtils(wrapper)
    expect(getSelectedRadioWrapper().classes()).toContain('is-checked')
  });

});