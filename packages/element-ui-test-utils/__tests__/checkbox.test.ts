import { Checkbox, CheckboxButton, CheckboxGroup } from "element-ui";
import { createInstance } from '../src/common';
import { createElCheckboxGroupTestUtils } from '../src/checkbox';

const createCheckboxInstance = (options = {}) => {
  return createInstance({
    components: {
      'el-checkbox': Checkbox,
      'el-checkbox-group': CheckboxGroup,
      'el-checkbox-button': CheckboxButton
    },
    ...options,
  })
}

describe('createElCheckboxGroupTestUtils', () => {

  it('getValues', () => {
    const { wrapper } = createCheckboxInstance({
      template: `<el-checkbox-group v-model="checkList">
      <el-checkbox label="A"></el-checkbox>
      <el-checkbox label="B"></el-checkbox>
      <el-checkbox label="C"></el-checkbox>
    </el-checkbox-group>`,
      data() {
        return {
          checkList: ['A']
        }
      }
    })

    const { getValues } = createElCheckboxGroupTestUtils(wrapper)
    expect(getValues()).toEqual(['A'])
  });

  it('setValues', async () => {
    const { wrapper } = createCheckboxInstance({
      template: `<el-checkbox-group v-model="checkList">
      <el-checkbox label="A"></el-checkbox>
      <el-checkbox label="B"></el-checkbox>
      <el-checkbox label="C"></el-checkbox>
    </el-checkbox-group>`,
      data() {
        return {
          checkList: ['A']
        }
      }
    })

    const { getValues, setValues } = createElCheckboxGroupTestUtils(wrapper)
    await setValues('B')
    expect(getValues()).toEqual(['A', 'B'])
  });

  it('getSelectedIndexes', async () => {
    const { wrapper } = createCheckboxInstance({
      template: `<el-checkbox-group v-model="checkList">
      <el-checkbox label="A"></el-checkbox>
      <el-checkbox label="B"></el-checkbox>
      <el-checkbox label="C"></el-checkbox>
    </el-checkbox-group>`,
      data() {
        return {
          checkList: ['A']
        }
      }
    })

    const { getSelectedIndexes } = createElCheckboxGroupTestUtils(wrapper)
    expect(getSelectedIndexes()).toEqual([0])
  });

  it('listen', async () => {
    const { wrapper } = createCheckboxInstance({
      template: `<el-checkbox-group v-model="checkList">
      <el-checkbox label="A"></el-checkbox>
      <el-checkbox label="B"></el-checkbox>
      <el-checkbox label="C"></el-checkbox>
    </el-checkbox-group>`,
      data() {
        return {
          checkList: ['A']
        }
      }
    })

    const { setValues, listen } = createElCheckboxGroupTestUtils(wrapper)
    const onChange = jest.fn()
    listen("change", onChange)
    await setValues('B')
    expect(onChange).toBeCalled()
  });

});