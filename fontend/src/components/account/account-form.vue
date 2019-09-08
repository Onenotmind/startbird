<template>
  <div id="accountForm" v-bind="$attrs" align="center">
    <Input placeholder="please enter your email..." class="custom-input"></Input>
    <div class="verify" v-if="verifyShow">
      <Input placeholder="code" class="custom-input-verify"></Input>
      <button class="button verify-btn"> verify</button>
    </div>
    <Input placeholder="please enter your password..." class="custom-input"></Input>
    <button class="button submit-btn"> {{ submitText }}</button>
  </div>
</template>

<style lang="scss" scoped>
#accountForm {
  width: 100%;
  height: auto;
  padding-top: 15px;
  padding-bottom: 15px;
}
.custom-input {
  width: 400px;
  height: 32px;
  margin-bottom: 20px;
}
.verify {
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  margin-bottom: 20px;
}
.custom-input-verify {
  width: 190px;
  height: 32px;
}
.button {
  position: relative;
  display: inline-block;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background-color: #fff;
  outline: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: rgba(0,0,0,0.65);
  text-align: center;
  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:active {
      
    }
  }
}
.submit-btn {
  width: 400px;
  height: 32px;
  background: $custom-color;
  color: #fff;
  border-radius: 20px;
}
.submit-btn:hover {
  background: $custom-bg-color;
}
.verify-btn {
  width: 200px;
  height: 32px;
  background: #47bc95;
  color: #fff;
}
.verify-btn:hover {
  background: green
}
</style>
<script>

export default {
  name: 'accountForm',
  components: {
    
  },
  props: {
    type: {
      type: String,
      default: 'login'
    }
  },
  data () {
    return {
      
    }
  },
  computed: {
    verifyShow: function () {
      if (this.type === 'login') return false
      return true
    },
    submitText : function () {
      if (this.type === 'login') return 'login in'
      if (this.type === 'signup') return 'sign up'
      if (this.type === 'reset') return 'reset password'
    }
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
