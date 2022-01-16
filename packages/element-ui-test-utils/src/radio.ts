import { ElWrapper } from './common';

export const createElRadioGroupTestUtils = (wrapper: ElWrapper) => {
  const radioGroupWrapper = wrapper.findComponent({ name: 'el-radio-group' });
  const radioGroupVm = radioGroupWrapper.vm as any
  const radioLabels = radioGroupVm.$children.map((item: any) => {
    return item.label
  })

  const getValue = () => {
    return radioGroupVm.value
  }
  const getRadioVmByIndex = (index: number) => {
    return radioGroupVm.$children[index]
  }
  const getRadioWrapperByIndex = (index = 0) => {
    const elRadioWrappers = wrapper.findAllComponents({ name: 'el-radio' })
    return elRadioWrappers.at(index)
  }
  const getRadioVmByLabel = (value: string | number) => {
    const index = radioLabels.indexOf(value)
    return getRadioVmByIndex(index)
  }
  const getRadioWrapperByLabel = (value: string | number) => {
    const index = radioLabels.indexOf(value)
    return getRadioWrapperByIndex(index)
  }

  return {
    findRadioGroupVm() {
      return radioGroupVm
    },
    getValue() {
      return radioGroupVm.value
    },
    async setValue(value: string | number) {
      const radioWrapper = getRadioWrapperByLabel(value);
      const radio = radioWrapper.find(".el-radio__original")
      radio.setChecked()
      await radioWrapper.vm.$nextTick()

      expect(radioWrapper.classes()).toContain('is-checked')
    },
    getRadioVmByIndex(index = 0) {
      return getRadioVmByIndex(index)
    },
    getRadioWrapperByIndex(index = 0) {
      return getRadioWrapperByIndex(index)
    },
    getRadioVmByLabel(label: string | number) {
      return getRadioVmByLabel(label)
    },
    getRadioWrapperByLabel(label: string | number) {
      return getRadioWrapperByLabel(label)
    },
    getSelectedRadioWrapper() {
      const value = getValue()
      return getRadioWrapperByLabel(value)
    },
    getSelectedIndex() {
      const value = getValue()
      return radioLabels.indexOf(value)
    },
  }
}