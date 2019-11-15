<template>
  <!-- :disabled="buttonDisabled || loading" -->
  <button
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'bb-button--' + type : '',
      buttonSize ? 'bb-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-ssxlCircle': ssxlCircle
      }
    ]"
    class="bb-button"
    @click="handleClick"
  >
    <!-- <i class="el-icon-loading"></i> -->
    <i
      v-if="icon && !loading"
      :class="icon"/>
    <span v-if="$slots.default"><slot/></span>
  </button>
</template>
<script>
export default {
  name: 'BbButton',

  inject: {
    bbForm: {
      default: ''
    },
    bbFormItem: {
      default: ''
    }
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    ssxlCircle: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    _bbFormItemSize () {
      return (this.bbFormItem || {}).bbFormItemSize
    },
    buttonSize () {
      return this.size
      // || this._bbFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonDisabled () {
      return this.disabled || (this.bbForm || {}).disabled
    }
  },

  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
<style lang="scss" scoped>
    .bb-button{
        padding: 0.09rem 0.16rem;
        border-radius: 0.04rem;
        font-size: 0.14rem;
        text-align: center;
        color: #333333;
        white-space: nowrap;
        cursor: pointer;
    }
    .bb-button--default{
        background: #FFFFFF;
        border: 1px solid #D3D6D3;
    }
    .bb-button--delete{
        background: #FF342D;
        border: 1px solid #FF342D;
        color: #FFFFFF;
    }
    .bb-button--success{
        background: #24B764;
        border: 1px solid #24B764;
        color: #FFFFFF;
    }
    .is-disabled{
        background: #E9EBE9;
        border: 1px solid #E9EBE9;
        color: #D3D6D3;
    }
    button[disabled]{
        background: #E9EBE9;
        color: #D3D6D3;
        opacity: 1;
    }
    .is-loading{

    }
    .is-plain{

    }
    .is-round{

    }
    .is-circle{

    }
    // 大小
    .bb-button--small {
      min-width: 0.32rem;
      padding: 0rem;
    }
</style>
