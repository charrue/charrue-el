import type { ElWrapper, ElVm, BaseValueType } from './common';

export const createElCheckboxGroupTestUtils = (wrapper: ElWrapper) => {
  const checkboxGroupWrapper = wrapper.findComponent({ name: 'el-checkbox-group' });
  const checkboxGroupVm = checkboxGroupWrapper.vm as ElVm
  const checkboxLabels = checkboxGroupVm.$children.map((item: ElVm) => {
    return item.label
  })

  const getValues = (): BaseValueType[] => {
    return checkboxGroupVm.value
  }
  const getCheckboxVmByIndex = (index: number): ElVm => {
    return checkboxGroupVm.$children[index]
  }
  const getCheckboxWrapperByIndex = (index = 0): ElWrapper => {
    const elCheckboxWrappers = wrapper.findAllComponents({ name: 'el-checkbox' })
    return elCheckboxWrappers.at(index) as ElWrapper
  }
  const getCheckboxVmByLabel = (value: BaseValueType): ElVm => {
    const index = checkboxLabels.indexOf(value)
    return getCheckboxVmByIndex(index)
  }
  const getCheckboxWrapperByLabel = (value: BaseValueType): ElWrapper => {
    const index = checkboxLabels.indexOf(value)
    return getCheckboxWrapperByIndex(index)
  }
  const listen = (eventName: string, cb: () => void) => checkboxGroupVm.$on(eventName, cb)


  return {
    findCheckboxGroupVm(): ElVm {
      return checkboxGroupVm
    },
    getValues(): BaseValueType[] {
      return getValues()
    },
    async setValues(value: BaseValueType | BaseValueType[]): Promise<void> {
      const values = Array.isArray(value) ? value : [value]
      await Promise.all(values.map(async (val) => {
        const checkboxWrapper = getCheckboxWrapperByLabel(val);
        const checkbox = checkboxWrapper.find(".el-checkbox__original")
        checkbox.setChecked()
        await checkboxWrapper.vm.$nextTick()
        expect(checkboxWrapper.classes()).toContain('is-checked')
      }))
    },
    listen(eventName: string, cb: () => void) {
      listen(eventName, cb)
    },
    getCheckboxVmByIndex(index = 0): ElVm {
      return getCheckboxVmByIndex(index)
    },
    getCheckboxWrapperByIndex(index = 0): ElWrapper {
      return getCheckboxWrapperByIndex(index)
    },
    getCheckboxVmByLabel(label: BaseValueType): ElVm {
      return getCheckboxVmByLabel(label)
    },
    getCheckboxWrapperByLabel(label: BaseValueType): ElWrapper {
      return getCheckboxWrapperByLabel(label)
    },
    getSelectedCheckboxWrapper(): ElWrapper[] {
      const values = getValues()
      return values.map(val => getCheckboxWrapperByLabel(val))
    },
    getSelectedIndexes(): number[] {
      const value = getValues()
      return value.map(val => checkboxLabels.indexOf(val))
    },
  }
}