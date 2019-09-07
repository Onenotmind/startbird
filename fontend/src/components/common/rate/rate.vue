<template>
  <div id="rate" v-bind="$attrs">
    <img v-for="item in count" :key="item" :src="item <= curIndex ? imgStar : imgStarInvert" @click="handleClick(item)" :class="[`is-${size}`]" >
  </div>
</template>

<style lang="scss" scoped>
#rate {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
img {
  width: auto;
  margin-right: 2px;
}
.is-small {
  height: 18px;
}
.is-medium {
  height: 25px;
}
</style>
<script>
import imgStar from './img/star.png'
import imgStarInvert from './img/star-invert.png'
export default {
  name: 'App',
  props: {
    count: {
      type: Number,
      default: 5
    },
    initIndex: {
      type: Number,
      default: -1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data () {
    return {
      imgStar,
      imgStarInvert,
      curIndex: -1
    }
  },
  computed: {
    
  },
  watch: {
  },
  mounted () {
    this.curIndex = this.initIndex
  },
  methods: {
    handleClick (index) {
      if (this.disabled) return
      this.curIndex = index
      this.$emit('rate-num', index + 1)
    }
  }
}
</script>
