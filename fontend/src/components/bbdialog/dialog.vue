
<template>
  <shade v-if="visible">
    <div
      :style="{width: width,top: top, height: height}"
      class="dialog-wrap cursor">
      <div class="bb-header">
        <div class="bb-title">{{ title }}</div>
        <div
          v-if="showClose"
          class="bb-close"
          @click="closeHandle">
          <span/>
          <img
            src="../../assets/close.svg"
            alt="关闭">
        </div>
      </div>
      <div class="bb-body">
        <slot/>
      </div>
      <div class="bb-footer">
        <slot name="footer"/>
      </div>
    </div>
  </shade>
</template>
<script>
import shade from '../shade.vue'
export default {
  name: 'Dialogs',
  components: {
    shade
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '50%'
    },
    height: {
      type: String,
      default: '2.4rem'
    },
    showClose: {// 关闭按钮显示隐藏
      type: Boolean,
      default: true
    },
    visible: {// 弹窗的隐藏与展示
      type: Boolean,
      default: false
    },
    top: { // 弹窗距 顶部的距离
      type: String,
      default: '15vh'
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  watch: {
    visible: function (newVal, oldVal) {
      // this.dialogVisible = newVal
    }
  },
  mounted () {
    this.dialogVisible = this.visible
    // this.dialogVisible = this.visible
    console.info('this.dialogVisible', this.visible)
  },
  methods: {
    closeHandle () {
      // 关闭事件
      this.$emit('close')
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
$gray:#F8F8F8;
$white:#171717;
.bb-dialog{
    position: fixed;
    top: 0;
    z-index: 1000;
    color: black;
    width: 100%;
    height: 100%;
    overflow: auto;

    .bb-modal{
        position: fixed;
        // top: 0px;
        // left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0,0.5);
    }
    .dialog-wrap{
        position: relative;
        border-radius: 0.06rem;
        margin:auto;
        background: rgb(255,255,255);
        // overflow:hidden;
        .bb-header{
            display: flex;
            height: 0.8rem;
            border-radius: 0.06rem;
            background-color: $gray;
            border: 1px #DDDDDD solid;
            .bb-title {
                flex: 1;
                font-size: 0.3rem;
                letter-spacing: 0;
                color: $white;
                font-weight: bold;
                line-height: 0.8rem;
                padding-left: 0.31rem;
                font-weight: 700;
            }
            .bb-close{
              vertical-align: middle;
              img{
                height: 0.24rem;
                padding-right: 0.22rem;
                vertical-align: middle;
              }
              span{
                vertical-align: middle;
                display: inline-block;
                height: 100%;
              }
            }
        }
    }
}
</style>
