<template>
  <div>
    <div style="margin-bottom: 20px">{{ formDataValue }}</div>
    <div class="form-item">
      <span class="form-label">String</span>
      <form-field v-model="formData.string" type="string" />
    </div>
    <div class="form-item">
      <span class="form-label">Number</span>
      <form-field v-model="formData.number" type="number" @change="onChange" />
    </div>
    <div class="form-item">
      <span class="form-label">Date</span>
      <form-field v-model="formData.date" type="date" />
    </div>
    <div class="form-item">
      <span class="form-label">Week</span>
      <form-field v-model="formData.week" type="week" />
    </div>
    <div class="form-item">
      <span class="form-label">Time</span>
      <form-field v-model="formData.time" type="time" />
    </div>
    <div class="form-item">
      <span class="form-label">Datetime</span>
      <form-field v-model="formData.datetime" type="datetime" />
    </div>
    <div class="form-item">
      <span class="form-label">Daterange</span>
      <form-field v-model="formData.daterange" type="daterange" />
    </div>
    <div class="form-item">
      <span class="form-label">Timerange</span>
      <form-field v-model="formData.timerange" type="timerange" />
    </div>
    <div class="form-item">
      <span class="form-label">Datetimerange</span>
      <form-field v-model="formData.datetimerange" type="datetimerange" />
    </div>
    <div class="form-item">
      <span class="form-label">Monthrange</span>
      <form-field v-model="formData.monthrange" type="monthrange" />
    </div>
    <div class="form-item">
      <span class="form-label">Dates</span>
      <form-field v-model="formData.dates" type="dates" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ElementUiPlusExtensionExamples",
  data() {
    return {
      formData: {
        string: "",
        number: "",
        date: "",
        week: "",
        time: "",
        datetime: "",
        daterange: [],
        timerange: "",
        datetimerange: [],
        monthrange: [],
        dates: []
      }
    }
  },
  computed: {
    formDataValue() {
      return JSON.stringify(this.formData, null, 2)
    }
  },
  methods: {
    onChange(val) {
      console.log(val)
    }
  },

}
</script>

<style lang="scss">
  .form-item {
    display: flex;
    align-items: center;
    width: 60vw;
    margin: 0 auto;
    margin-bottom: 20px;
    .form-label {
      width: 120px;
      flex: 0 0 120px;
    }
  }
</style>