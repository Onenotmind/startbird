<template>
  <div id="customSearch" v-bind="$attrs">
    <Input placeholder="请输入内容" prefix-icon="search" class="custom-input">
      <template slot="append">
        <CustomButton class="btn custom-btn" type="success" :style="customBtnStyle">lollisou</CustomButton>
      </template>
    </Input>
  </div>
</template>

<style lang="scss" scoped>
.custom-input {
  width: 600px;
  height: 32px;
}
.custom-btn {
  border-radius: 0;
}
</style>
<script>

export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      customBtnStyle: {
        'border-radius': 0,
        'font-size': '14px',
        'padding': '10px 16px'
      }
    }
  },
  computed: {
    
  },
  watch: {
  },
  mounted () {
  },
  destroyed () {

  },
  methods: {
  }
}
</script>
