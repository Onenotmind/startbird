<template>
  <div
    :class="['bb-input-number', isFocus ? 'active' : '']">
    <span
      v-show="originVal === 0 && showPlaceHolder"
      class="placeholder">
      {{ createPlaceHolder }}
    </span>
    <el-input-number
      v-model="value"
      :min="min"
      :max="max"
      :step="1"
      :placeholder="createPlaceHolder"
      controls-position="right"
      size="small"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange" />
  </div>
</template>
<script>
export default {
  name: 'BbInputNumber',
  props: {
    originVal: { // 传入的值
      type: [Number, String],
      default: ''
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      value: '',
      isFocus: false,
      showPlaceHolder: true
      // min: 0
    }
  },
  computed: {
    createPlaceHolder () {
      return `${this.min}~${this.max}`
    }
  },
  watch: {
    originVal: {
      handler: function (val) {
        // 当其他值已经选中的时候 显示placeholder
        if (val === 0) {
          this.showPlaceHolder = true
        }
        if (isNaN(val)) {
          this.value = this.createPlaceHolder()
        } else {
          this.value = val
        }
      },
      immediate: true
    }
  },
  methods: {
    handleChange () {
      this.showPlaceHolder = false
      this.$emit('change', this.value)
    },
    handleFocus () {
      this.showPlaceHolder = false
      this.isFocus = true
    },
    handleBlur () {
      if (this.value === this.min) {
        this.$emit('change', this.value)
      }
      this.isFocus = false
    }
  }
}
</script>
<style lang="scss">
$largeSize: 1.4;
.bb-input-number {
  position: relative;
  .placeholder {
    position: absolute;
    left: 0;
    color: #999;
    font-size: .12rem * $largeSize;
    top: .15rem;
    z-index: 9;
    pointer-events: none;
    /* line-height: .3rem; */
    background: #fff;
    left: .1rem;
  }
}
.bb-input-number .el-input-number--small {
  width: .72rem * $largeSize;
  height: .32rem * $largeSize;
  border: 1px solid #e9ebe9;
  border-radius: .04rem;
  line-height: .32rem * $largeSize;
}
.active .el-input-number--small {
  border: 1px solid #24b764;
  background: rgba(36,183,100,0.15);
}
.el-input-number--small:focus,
.el-input-number--small:hover {
  border-color: #24b764;
}
.bb-input-number .el-input-number.is-controls-right .el-input__inner {
  border: none;
  padding-left: .08rem;
  padding-right: 0;
  text-align: left;
  box-shadow: unset;
  height: .32rem * $largeSize;
  color: #999;
  font-size: .12rem * $largeSize;
  color: #212121;
  margin: 0;
  background: none;
  // line-height: calc(.32rem + 1px);
  /* margin-top: -.1rem; */
  box-sizing: border-box;
  vertical-align: 2px;
}
.active .el-input-number.is-controls-right .el-input__inner {
  color: #24b764;
  background: rgba(36,183,100,0);
}
.bb-input-number {
  .el-input-number.is-controls-right .el-input-number__increase {
    border: none;
    background: #fff;
  }
  .el-input-number.is-controls-right .el-input-number__decrease {
    border: none;
    background: #fff;
  }
  &.active .el-input-number.is-controls-right .el-input-number__increase {
    background: rgba(36,183,100, 0);
  }
  &.active .el-input-number.is-controls-right .el-input-number__decrease {
    background: rgba(36,183,100, 0);
  }
  .el-icon-arrow-down::before {
    content: '';
  }
  .el-icon-arrow-up::before {
    content: '';
  }
  .el-icon-arrow-down {
    display: block;
    width: 0;
    height: 0;
    border: .08rem solid transparent;
    border-top: .07rem solid #b3b8b3;
    margin-top: 0;
  }
  .el-icon-arrow-down:hover {
    border-top-color: #24b764;
  }
  .el-icon-arrow-up {
    display: block;
    width: 0;
    height: 0;
    border: .08rem solid transparent;
    border-bottom: .07rem solid #b3b8b3;
    margin-top: -.1rem;
  }
  .el-icon-arrow-up:hover {
    border-bottom-color: #24b764;
  }
  .el-input-number--small .el-input-number__decrease,
  .el-input-number--small .el-input-number__increase {
    width: .2rem * $largeSize;
  }
  .el-input-number__decrease {
    bottom: .04rem * $largeSize;
  }
  .el-input-number__increase {
    top: .1rem * $largeSize;
  }
  .el-input-number.is-controls-right .el-input-number__decrease {
    bottom: 0.03rem;
  }
}
</style>
