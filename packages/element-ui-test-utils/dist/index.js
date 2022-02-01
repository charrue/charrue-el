const createElInputTestUtils = (wrapper) => {
  const inputWrapper = wrapper.find("input");
  const nativeInput = inputWrapper.element;
  const elInputWrapper = wrapper.findComponent({ name: "el-input" });
  let hasInput = false;
  const checkElInput = () => {
    if (hasInput)
      return;
    const exists = inputWrapper.exists();
    hasInput = exists;
    expect(exists).toBe(true);
  };
  const listen = (eventName, cb) => elInputWrapper.vm.$on(eventName, cb);
  checkElInput();
  return {
    getElInputVm() {
      return elInputWrapper.vm;
    },
    getInputWrapper() {
      return elInputWrapper;
    },
    getValue() {
      return nativeInput.value;
    },
    setValue(value) {
      inputWrapper.setValue(value);
    },
    listen(eventName, cb) {
      listen(eventName, cb);
    },
    async clear() {
      const clearMock = jest.fn();
      expect(nativeInput.value).not.toBe("");
      wrapper.trigger("mouseenter");
      await wrapper.vm.$nextTick();
      listen("clear", clearMock);
      const clearIconWrapper = wrapper.find(".el-input__clear");
      clearIconWrapper.trigger("click");
      await wrapper.vm.$nextTick();
      expect(clearMock).toBeCalled();
    }
  };
};

const createElRadioGroupTestUtils = (wrapper) => {
  const radioGroupWrapper = wrapper.findComponent({ name: "el-radio-group" });
  const radioGroupVm = radioGroupWrapper.vm;
  const radioLabels = radioGroupVm.$children.map((item) => {
    return item.label;
  });
  const getValue = () => {
    return radioGroupVm.value;
  };
  const getRadioVmByIndex = (index) => {
    return radioGroupVm.$children[index];
  };
  const getRadioVmByLabel = (label) => {
    const index = radioLabels.indexOf(label);
    return getRadioVmByIndex(index);
  };
  const getRadioWrapperByIndex = (index = 0) => {
    const elRadioWrappers = wrapper.findAllComponents({ name: "el-radio" });
    return elRadioWrappers.at(index);
  };
  const getRadioWrapperByLabel = (value) => {
    const index = radioLabels.indexOf(value);
    return getRadioWrapperByIndex(index);
  };
  return {
    findRadioGroupVm() {
      return radioGroupVm;
    },
    getValue() {
      return getValue();
    },
    async setValue(value) {
      const radioWrapper = getRadioWrapperByLabel(value);
      const radio = radioWrapper.find(".el-radio__original");
      radio.setChecked();
      await radioWrapper.vm.$nextTick();
      expect(radioWrapper.classes()).toContain("is-checked");
    },
    getRadioVmByIndex(index = 0) {
      return getRadioVmByIndex(index);
    },
    getRadioWrapperByIndex(index = 0) {
      return getRadioWrapperByIndex(index);
    },
    getRadioVmByLabel(label) {
      return getRadioVmByLabel(label);
    },
    getRadioWrapperByLabel(label) {
      return getRadioWrapperByLabel(label);
    },
    getSelectedRadioWrapper() {
      const value = getValue();
      return getRadioWrapperByLabel(value);
    },
    getSelectedIndex() {
      const value = getValue();
      return radioLabels.indexOf(value);
    }
  };
};

const createElCheckboxGroupTestUtils = (wrapper) => {
  const checkboxGroupWrapper = wrapper.findComponent({ name: "el-checkbox-group" });
  const checkboxGroupVm = checkboxGroupWrapper.vm;
  const checkboxLabels = checkboxGroupVm.$children.map((item) => {
    return item.label;
  });
  const getValues = () => {
    return checkboxGroupVm.value;
  };
  const getCheckboxVmByIndex = (index) => {
    return checkboxGroupVm.$children[index];
  };
  const getCheckboxWrapperByIndex = (index = 0) => {
    const elCheckboxWrappers = wrapper.findAllComponents({ name: "el-checkbox" });
    return elCheckboxWrappers.at(index);
  };
  const getCheckboxVmByLabel = (value) => {
    const index = checkboxLabels.indexOf(value);
    return getCheckboxVmByIndex(index);
  };
  const getCheckboxWrapperByLabel = (value) => {
    const index = checkboxLabels.indexOf(value);
    return getCheckboxWrapperByIndex(index);
  };
  const listen = (eventName, cb) => checkboxGroupVm.$on(eventName, cb);
  return {
    findCheckboxGroupVm() {
      return checkboxGroupVm;
    },
    getValues() {
      return getValues();
    },
    async setValues(value) {
      const values = Array.isArray(value) ? value : [value];
      await Promise.all(values.map(async (val) => {
        const checkboxWrapper = getCheckboxWrapperByLabel(val);
        const checkbox = checkboxWrapper.find(".el-checkbox__original");
        checkbox.setChecked();
        await checkboxWrapper.vm.$nextTick();
        expect(checkboxWrapper.classes()).toContain("is-checked");
      }));
    },
    listen(eventName, cb) {
      listen(eventName, cb);
    },
    getCheckboxVmByIndex(index = 0) {
      return getCheckboxVmByIndex(index);
    },
    getCheckboxWrapperByIndex(index = 0) {
      return getCheckboxWrapperByIndex(index);
    },
    getCheckboxVmByLabel(label) {
      return getCheckboxVmByLabel(label);
    },
    getCheckboxWrapperByLabel(label) {
      return getCheckboxWrapperByLabel(label);
    },
    getSelectedCheckboxWrapper() {
      const values = getValues();
      return values.map((val) => getCheckboxWrapperByLabel(val));
    },
    getSelectedIndexes() {
      const value = getValues();
      return value.map((val) => checkboxLabels.indexOf(val));
    }
  };
};

export { createElCheckboxGroupTestUtils, createElInputTestUtils, createElRadioGroupTestUtils };
