<template>
  <div id="app">
    <div class="navigation">
      <div class="logo-container">
        <a href="">
          <img class="" src="./img/logo.png"/>
        </a>
      </div>
      <div class="search-bar">
        <input class="search-field" type="text" placeholder="Author, keyword, title, ISBN">
        <button type="submit" class="searchButton">
          <img class="searchicon" alt="search" src="./img/icon-search.png">
        </button>
      </div>
      <div class="nav-item">
        <a class="nav-link" @click="changeTab('MyBooks')">MY BOOKS</a>
      </div>
      <div class="nav-item">
        <a class="nav-link">BROWSER</a>
      </div>
      <div class="nav-item">
        <a class="nav-link">SIGN UP</a>
      </div>
    </div>
    <div class="main-content">
      <MainPage v-if="curTabName === 'mainPage'" />
      <BookList v-if="curTabName === 'MyBooks'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  text-align: center;
  position: relative;
  width: 850px;
  margin-left: auto;
  margin-right: auto;
  font: 14px crimson,sans-serif;
}
.navigation {
  overflow: hidden;
  text-align: center;
  margin-top: 10px;
  width: 104%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between
}
a {
  text-decoration: none;
  font: 15px roboto condensed,sans-serif;
  cursor: pointer;
}
.nav-link {
  top: 12px;
  color: #595d5c;
  font: 14px roboto condensed,sans-serif;
}
a.nav-link:hover {
  color: #6ab5f3
}
.nav-item {
  width: 102px;
  height: 100%;
  text-align: center;
  vertical-align: middle
}
.navigation div {
  display: inline-block;
}
.logo-container {
  width: 135px;
  text-align: center;
  vertical-align: middle;
  margin-right: 10px;
}
.search-field {
  width:250px;
  padding-right:5px;
  padding-left:5px;
  background-color:#e1e2e2;
  -moz-border-radius:4px;
  -webkit-border-radius: 4px;
  border: 1px solid #cacdcd;
  font: italic 13px roboto condensed,sans-serif;
  color: #acadae
}
.searchButton {
  -moz-border-radius:4px;
  -webkit-border-radius: 4px;
  font: italic 13px roboto condensed,sans-serif;
  color: #fff;
  width: 75px;
  background-color: #47bc95;
  border: 1px solid #47bc95;
  margin-left: 15px;
}
.searchicon {
  height: 13px;
  width: 13px;
}
.main-content {
  padding-bottom: 60px;
  position: relative;
  width: 100%;
  height: auto;
  z-index: 0;
}
</style>
<script>
import CustomSearch from './components/custom-search'
import BookList from './components/book-list'
import BookOperator from './components/book-operator'
import BookInfo from './components/book-info'
import ReadPage from './components/read-page.vue'
import MainPage from './components/main-page'
export default {
  name: 'App',
  components: {
    CustomSearch,
    BookList,
    BookOperator,
    BookInfo,
    ReadPage,
    MainPage
  },
  data () {
    return {
      curTabName: 'MainPage'
    }
  },
  computed: {
    
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    changeTab (val) {
      this.curTabName = val
    }
  }
}
</script>
