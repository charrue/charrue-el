import SchemaForm from "./SchemaForm.vue";
import SchemaField from "./SchemaField.vue";

SchemaForm.install = (app) => {
  app.component(SchemaForm.name, SchemaForm)
}

export { SchemaField, SchemaForm };



export default SchemaForm;
