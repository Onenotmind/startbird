<template>
  <div
    v-show="visible"
    class="toast-wrap">
    <div
      :style="params.style?{background: '#24B764'}:{}"
      class="toast-content-wrap">
      <div class="icon-wrap">
        <img
          v-if="params.type === 'success'"
          class="img"
          src="./toast-sucess.png">
        <img
          v-if="params.type === 'error'"
          class="img"
          src="./toast-error.png">
      </div>
      <div class="toast-content">
        {{ params.message }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Notice',
  data () {
    return {
      visible: false,
      // content: 'hello',
      params: {
        message: '',
        type: '',
        style: null
      },
      duration: 2000
    }
  },
  mounted () {
    // 清楚之前的 toast
    this.$nextTick(_ => {
      let eles = document.getElementsByClassName('toast-wrap')
      if (eles.length > 1) {
        for (let key = 0; key < eles.length - 1; key++) {
          eles[key].style.background = 'red'
          eles[key].parentNode.removeChild(eles[key])
        }
      }
    })
    this.setTimer() // 挂载的时候就开始计时，2000ms后消失
  },
  methods: {
    setTimer () {
      if (this.params.duration) { // 目前使用在  导出图片的等待
        this.duration = this.params.duration
      } else {
        this.duration = 2000
      }
      setTimeout(() => {
        this.close() // 2000ms之后调用关闭方法
      }, this.duration)
    },
    close () {
      this.visible = false
      setTimeout(() => {
        this.$destroy(true)
        if (this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el) // 从DOM里将这个组件移除
        }
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
    .toast-wrap{
        position: fixed;
        left: 50%;
        bottom: 1.6rem;
        transform: translate(-50%);
    }
    .toast-content-wrap{
        display: flex;
        align-items: center;
        background: #000000;
        opacity: 0.8;
        padding: 0.17rem 0.28rem 0.19rem 0.28rem;
        color: #ffffff;
        margin: 0 auto;
        border-radius: 1rem;
        .icon-wrap {
          font-size: 0rem; // 影响的原因
          .img{
            width: 0.26rem;
            margin-right: 0.13rem;
          }
        }
        .toast-content{
          font-size: 0.24rem;
        }
    }
</style>
