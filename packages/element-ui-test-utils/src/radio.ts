import type { ElWrapper, ElVm, BaseValueType } from './common';

export const createElRadioGroupTestUtils = (wrapper: ElWrapper) => {
  const radioGroupWrapper = wrapper.findComponent({ name: 'el-radio-group' });
  const radioGroupVm: ElVm = radioGroupWrapper.vm as ElVm
  const radioLabels = radioGroupVm.$children.map((item: ElVm) => {
    return item.label
  })

  const getValue = (): BaseValueType => {
    return radioGroupVm.value
  }
  const getRadioVmByIndex = (index: number): ElVm => {
    return radioGroupVm.$children[index] as ElVm
  }
  const getRadioVmByLabel = (label: BaseValueType): ElVm => {
    const index = radioLabels.indexOf(label)
    return getRadioVmByIndex(index)
  }
  const getRadioWrapperByIndex = (index = 0): ElWrapper  => {
    const elRadioWrappers = wrapper.findAllComponents({ name: 'el-radio' })
    return elRadioWrappers.at(index) as ElWrapper
  }
  const getRadioWrapperByLabel = (value: BaseValueType) => {
    const index = radioLabels.indexOf(value)
    return getRadioWrapperByIndex(index)
  }

  return {
    findRadioGroupVm(): ElVm {
      return radioGroupVm
    },
    getValue(): BaseValueType {
      return getValue()
    },
    async setValue(value: BaseValueType): Promise<void> {
      const radioWrapper = getRadioWrapperByLabel(value);
      const radio = radioWrapper.find(".el-radio__original")
      radio.setChecked()
      await radioWrapper.vm.$nextTick()

      expect(radioWrapper.classes()).toContain('is-checked')
    },
    getRadioVmByIndex(index = 0): ElVm {
      return getRadioVmByIndex(index)
    },
    getRadioWrapperByIndex(index = 0): ElWrapper {
      return getRadioWrapperByIndex(index)
    },
    getRadioVmByLabel(label: BaseValueType): ElVm {
      return getRadioVmByLabel(label)
    },
    getRadioWrapperByLabel(label: BaseValueType): ElWrapper {
      return getRadioWrapperByLabel(label)
    },
    getSelectedRadioWrapper(): ElWrapper {
      const value = getValue()
      return getRadioWrapperByLabel(value)
    },
    getSelectedIndex(): number {
      const value = getValue()
      return radioLabels.indexOf(value)
    },
  }
}