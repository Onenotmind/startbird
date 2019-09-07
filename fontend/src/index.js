import Vue from 'vue'
import App from './app.vue'
// import router from './router'
import store from './store'
// import { Button, Table } from 'iview'
// import 'iview/dist/styles/iview.css'
// import './theme/index.less'
// Vue.component('Button', Button)
// Vue.component('Table', Table)
import 'reset-css';
import 'material-design-icons/iconfont/material-icons.css';
import Input from './components/common/input/input.vue'
import Icon from './components/common/icon/icon.vue'
import CustomButton from './components/common/button/button.vue'
import Rate from './components/common/rate/rate.vue'
import './styles/common/common.scss';
Vue.component('Input', Input)
Vue.component('Icon', Icon)
Vue.component('CustomButton', CustomButton)
Vue.component('Rate', Rate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  store,
  components: { App },
  template: '<App/>'
})
