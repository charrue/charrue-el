import type { ElWrapper, ElVm } from './common';

export const createElInputNumberTestUtils = (wrapper: ElWrapper) => {
  const compWrapper = wrapper.findComponent({ name: 'el-input-number' });
  const compVm = compWrapper.vm as ElVm

  const getValue = (): number => parseInt(compVm.value, 10)
  const listen = (eventName: string, cb: () => void) => compVm.$on(eventName, cb)

  return {
    getWrapper(): ElWrapper {
      return compWrapper as ElWrapper
    },
    getVm(): ElVm {
      return compVm
    },
    listen,
    getValue(): number {
      return getValue()
    },
    async setValue(value: number): Promise<void> {
      const inputWrapper = compWrapper.find<HTMLInputElement>('.el-input__inner');
      inputWrapper.setValue(value)
      inputWrapper.trigger('change')
      await compVm.$nextTick()
    },
    async decrease(): Promise<void> {
      const decreaseWrapper = compWrapper.find('.el-input-number__decrease')
      // el-input-number的decrease的点击是通过v-repeat-click指令实现的，即mouseup、mousedown事件的组合
      // 如果两个事件的时间间隔在100ms内，则会执行一次事件函数
      decreaseWrapper.trigger('mousedown')
      document.dispatchEvent(new Event("mouseup"))
      await compVm.$nextTick()
    },

    async increase(): Promise<void> {
      const increaseWrapper = compWrapper.find('.el-input-number__increase')
      increaseWrapper.trigger('mousedown')
      document.dispatchEvent(new Event("mouseup"))
      await compVm.$nextTick()
    },
  }
}