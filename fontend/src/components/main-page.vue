<template>
  <div id="mainPage" v-bind="$attrs">
    <div class="home_header">
      Welcome to Wunoland! Let's start with an email!
    </div>
    <div align="center">
      <Input placeholder="please enter an email to sign up..."  class="custom-input"></Input>
    </div>
    <div class="home_recommended">
      <h2 class="title">
        TODAY'S SPECIAL
      </h2>
      <div>
        <BookList />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#mainPage {
  width: 100%;
  height: auto;
  position: relative;
  margin-bottom: 10px;
}
.home_header {
  width:100%;
  height:30px;
  text-align:center;
  vertical-align:middle;
  padding-top:20px;
  padding-bottom:40px;
  margin-bottom:30px;
  color:#47bc95;
  font:35px crimson text,serif
}
.custom-input {
  width: 600px;
  height: 32px;
}
.home_recommended {
  position: relative;
  width: 100%;
  height: auto;
}
h2.title {
  padding-left:10px;
  color:#595d5c;
  width:100%;
  height:auto;
  padding-top:3%;
  font-size: 1.5em;
  font-weight: bold;
  text-align:left
}
</style>
<script>
import BookList from './book-list'
export default {
  name: 'App',
  components: {
    BookList
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
  methods: {
  }
}
</script>
