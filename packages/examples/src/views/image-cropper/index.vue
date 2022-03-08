<template>
  <div>
    <image-cropper
      :value="value"
      @input="onInput"
      :cropper-option="{
        infoTrue:false,
        maxImgSize:2000
      }"
    >
    </image-cropper>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
  name: '',
  setup() {
    const readonly=ref(false)
    const value = ref("https://cdn.sc-edu.com/img/2022/01/07/12/e8461c3aad5a1073cf25468d90ff2496.png")
    const onInput=()=>{

    }
 
    return {
      readonly,
      value,
      onInput
    }
  },
}

</script>
<style scoped lang='scss'>
</style>