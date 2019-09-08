<template>
  <div id="account" v-bind="$attrs">
    <div class="img-container">
      <img src="https://resources.lookback.io/images/converse.svg" alt="">
    </div>
    <h1>Hey, Welcome to Wunoland!</h1>
    <h2>Login to read books.</h2>
    <div class="account-container">
      <AccountForm />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#account {
  width: 100%;
  height: auto;
  text-align: center;
  padding-top: 25px;
}
.img-container {
  margin-bottom: 10px;
}
.img-container img {
  width: 70px;
  height: auto;
}
h1, h2 {
  font-family: Lato,Helvetica Neue,sans-serif;
}
h1 {
  margin: 0;
  font-size: 25px;
  line-height: 25px;
  margin-bottom: 10px;
  font-weight: 700;
}
h2 {
  margin: 0;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 10px;
  font-weight: 400;
}
.account-container {
  max-width: 500px;
  width: 80%;
  margin: 0 auto;
  background-color: #eee;
  box-shadow:1px 0 30px rgba(114,182,234,.2);
  border-radius: 8px;
  padding: 10px 6px;
}
</style>
<script>
import AccountForm from './account-form.vue'
export default {
  name: 'account',
  components: {
    AccountForm
  },
  data () {
    return {
      
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
