import Vue from 'vue'
import App from './app.vue'
// import router from './router'
import store from './store'
import { Button, Table } from 'iview'
// import 'iview/dist/styles/iview.css'
import './theme/index.less'

Vue.component('Button', Button)
Vue.component('Table', Table)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  store,
  components: { App },
  template: '<App/>'
})
