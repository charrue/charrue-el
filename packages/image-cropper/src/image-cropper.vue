<template>
  <div :class="['cropper-wrapper',customCropperName]">
    <!-- element 上传图片按钮 -->
    <template v-if="!isPreview">
      <el-upload
        class="upload-demo"
        action=""
        drag
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChangeUpload"
      >
        <template v-if="value">
          <img
            :src="value"
            class="w-full h-full"
          />

        </template>
        <template v-else>
          <slot name="placeholder">
            <div class="w-full h-full flex justify-center items-center">
              <img
                style="height: 80%"
                src="https://cdn.sc-edu.com/img/2022/01/07/12/e8461c3aad5a1073cf25468d90ff2496.png"
              />
            </div>
            <div class="el-upload__text">
              点击上传
            </div>
            <div class="el-upload__tip">
              支持绝大多数图片格式，单张图片最大支持{{ fileSize }}MB
            </div>
          </slot>
        </template>
      </el-upload>
    </template>
    <div
      v-else
      class="pre-box"
    >
      <el-upload
        class="upload-demo"
        action=""
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChangeUpload"
      >
        <slot name="preview"></slot>
        <img
          v-if="!$slots.preview"
          :src="previewImg"
          alt="裁剪图片"
        />
      </el-upload>
    </div>
    <!-- vueCropper 剪裁图片实现 -->
    <el-dialog
      title="图片剪裁"
      :visible.sync="dialogVisible"
      class="crop-dialog"
      append-to-body
      @close="clearImgHandle"
    >
      <div class="cropper-content">
        <div
          class="cropper"
          style="text-align: center"
        >
          <vue-cropper
            ref="cropper"
            :info="true"
            v-bind="option"
          ></vue-cropper>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="finish"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import * as imageConversion from "image-conversion";


export default {
  name: "GlobalImageCropper",
  components: {
    VueCropper,
  },
  props: {
    value: String,
    fileType: {
      type: Array,
      default() {
        return [
          "png",
          "jpg",
          "jpeg",
        ];
      },
    },
    fileSize: {
      type: Number,
      default: 2,
    },
    //裁剪框配置项
    cropperOption:{
      type:Object,
      default:()=>({ 
       
    })
    },
    customCropperName:{
      type:String
    }
  },
  data() {
    return {
      isPreview: false,
      dialogVisible: false,
      previewImg: "", // 预览图片地址
      // 裁剪组件的基础配置option
      option:{
        img: "https://pic1.zhimg.com/80/v2-366c0aeae2b4050fa2fcbfc09c74aad4_720w.jpg", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        canMoveBox: true, // 截图框能否拖动
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [16, 16], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高})
      },
      // 防止重复提交
      loading: false,
    };
  },
  watch: {
    value() {
      this.previewImg = this.value;
    },
    cropperOption:{
      handler(val){
        Object.assign(this.option,val)
      },
      deep:true,
      immediate:true
    }
  },
  created() {
    console.log(this);
  },
  methods: {

    // 上传按钮 限制图片大小和类型
    handleChangeUpload(file) {
      let isImg = false;
      if (this.fileType.length) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        isImg = this.fileType.some((type) => {
          if (file.raw.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
      } else {
        isImg = file.raw.type.indexOf("image") > -1;
      }
      if (!isImg) {
        this.$notify.warning(
          `文件格式不正确, 请上传${this.fileType.join("/")}图片格式文件!`,
        );
        return false;
      }

      if (this.fileSize) {
        const isLt = file.raw.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$notify.warning(`上传图片大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }

      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file.raw);
        this.loading = false;
        this.dialogVisible = true;
      });
      return true;
    },
    // 清理图片
    clearImgHandle() {
      this.option.img = "";
    },
    finish() {
      // 获取截图的 blob 数据
      this.$refs.cropper.getCropBlob((blob) => {
        imageConversion.compress(blob, 0.8)
          .then((compressedBlob) => {
            const imageExt = compressedBlob.type.split("/")[1];
            const compressedFile = new File([compressedBlob], `${Date.now()}.${imageExt}`, {
              type: compressedBlob.type,
            });

            this.$emit('upload',compressedFile)
            // uploadImage(compressedFile)
            //   .then((res) => {
            //     this.$emit("input", res.data?.url || "");
            //   });
          });
        this.loading = true;
        this.dialogVisible = false;
        this.previewImg = URL.createObjectURL(blob);
        this.isPreview = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cropper-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .pre-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      width: 100px;
      margin-top: 15px;
    }
  }
}

.crop-dialog {
  .cropper-content {
    padding: 0 40px;

    .cropper {
      width: auto;
      height: 350px;
    }
  }

  .action-box {
    padding: 25px 40px 0 40px;
    display: flex;
    justify-content: center;

    button {
      width: 80px;
      margin-right: 15px;
    }
  }

  .dialog-footer {
    button {
      width: 100px;
    }
  }
}
</style>
