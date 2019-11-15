<template>
  <div
    v-if="visible || params.fullscreen"
    class="bb-loading"
    name="loading">
    <div
      :class="{'fullscreen': fullscreen||params.fullscreen}"
      class="loading-mask">
      <div class="loading">
        <i class="el-icon-loading"/>
      </div>
      <div
        class="loading-text">
        {{ text || params.text || '正在加载' }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  data () {
    return {
      visible: false,
      fullscreen: true,
      text: null,
      params: {
        fullscreen: false,
        text: '正在加载'
      }
    }
  },
  mounted () {
  },
  methods: {
    show (params) { // 打开loading
      this.params.fullscreen = true
    },
    close () { // 关闭loading
      this.params.fullscreen = false
    }
  }
}
</script>
<style lang="scss">
    .loading-mask{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: absolute;
        z-index: 1050;
        background-color: rgba(0, 0, 0, 0.4);
        margin: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: opacity .3s;
        .fullscreen{
            position: fixed
        }
        .loading-text{
            font-size: 0.36rem;
        }
    }
    .el-icon-loading{
      font-size: 0.36rem;
    }
</style>
