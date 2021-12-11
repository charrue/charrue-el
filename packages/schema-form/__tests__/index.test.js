import SchemaForm from '@charrue/schema-form';
import Vue from 'vue'
import ElementUI from 'element-ui'
import { mount } from '@vue/test-utils'

/**
 * @typedef { Object } FieldComponentProps
 * @property { string[] } names
 * @property { string[] } placeholders
 * @property { string[] } datasets
 */

const createComponent = (options) => {
  const defaultMethods = {
    _getComponents(checkComponent) {
      const getSchemaFields = (parent, components = []) => {
        if ( typeof checkComponent === 'function' && checkComponent(parent)) {
          components.push(parent);
        } else if (parent.$children && parent.$children.length > 0) {
          parent.$children.forEach((child) => {
            getSchemaFields(child, components);
          });
        }
        return components
      };

      const cps = []
      if(this.$refs.schemaFormRef) {
        getSchemaFields(this.$refs.schemaFormRef.$children[0], cps);
      }
      return cps
    },
    getElFormItems() {
      return this._getComponents((parent) => parent.$el.classList.contains("el-form-item"))
    },
    getElFormItemProps() {
      const formItems = this.getElFormItems()
      const labels = formItems.map(t => t._props.label)
      const props = formItems.map(t => t._props.prop)
      return {
        labels,
        props
      }
    },
    getFieldComponents() {
      return this._getComponents((parent) => parent.$el.classList.contains("charrue-schema-field-item"))
    },
    /**
     * @return { FieldComponentProps }
     */
    getFieldComponentProps() {
      const cps = this.getFieldComponents()
      const names = cps.map(t => t.$options._componentTag)
      const placeholders = cps.map(t => t.$attrs.placeholder)
      const datasets = cps.map(t => t.$attrs['data-property'])

      return {
        names,
        placeholders,
        datasets
      }
    },
    getSchemaFieldComponentNames() {
      const cps = this.getFieldComponents()
      return cps.map(t => t.$options._componentTag).sort()
    }
  }
  const wrapper = mount({
    ...options,
    components: {
      'schema-form': SchemaForm,
    },
    methods: {
      ...defaultMethods,
      ...(options.methods || {})
    },
  })
  const vm = wrapper.vm.$children[0]

  return {
    wrapper,
    vm
  }
}

describe('SchemaForm', () => {
  Vue.use(ElementUI)

  /**
   * 检查 label prop dataset
   */
  const expectElFormItemAndElInputCommonProp = (vm) => {
    const inputProps = vm.getFieldComponentProps()
    const formItemProps = vm.getElFormItemProps()
    const keys = Object.keys(vm.schema)
    const labels = keys.map(k => vm.schema[k].title)
    expect(formItemProps.labels).toEqual(labels)
    expect(formItemProps.props).toEqual(keys)

    expect(inputProps.datasets).toEqual(keys)
  }

  it('create', () => {
    // vm = createVue()
    const { wrapper } = createComponent({
      template: `
        <schema-form
          v-model="value"
          :schema="schema"
        ></schema-form>
      `,
      data() {
        return {
          schema: {},
          value: {}
        }
      }
    })
    expect(wrapper.classes("charrue-schema-form-container")).toBe(true)
    expect(wrapper.vm.$children.$children.length).toBe(0)
  });

  it('computedFields', () => {
    const { vm } = createComponent({
      template: `
        <schema-form
          :schema="schema"
        ></schema-form>
      `,
      data() {
        return {
          schema: {
            name: {
              title: "Name",
            }
          },
        }
      }
    })

    expect(vm.$children.length).toBe(1)
    expect(vm.computedFields).toEqual([{ property: "name", type: "string", title: "Name" }])
    expect(vm.requiredFields).toEqual([])
    expect(vm.events).toEqual({})
    expect(vm.computedReadonlyWidgets).toEqual({
      string: "span",
      number: "span",
      textarea: "span",
    })
  });

  it('string', () => {
    const { wrapper } = createComponent({
      template: `
        <schema-form
          v-model="value"
          ref="schemaFormRef"
          :schema="schema"
        ></schema-form>
      `,
      data() {
        return {
          value: {},
          schema: {
            name: {
              title: "Name",
            }
          },
        }
      }
    })



    /**
     * @type { FieldComponentProps }
     */
    const inputProps = wrapper.vm.getFieldComponentProps()
    expectElFormItemAndElInputCommonProp(wrapper.vm)

    expect(inputProps.names).toEqual(["el-input"])
    expect(inputProps.placeholders).toEqual(["请输入Name"])

    const nameEl = wrapper.find("input[data-property='name']")
    nameEl.setValue("foo")
    expect(nameEl.element.value).toBe("foo")
    expect(wrapper.vm.value).toEqual({ name: "foo" })

    nameEl.setValue(100)
    expect(nameEl.element.value).toBe("100")
    expect(wrapper.vm.value).toEqual({ name: "100" })
  });
});