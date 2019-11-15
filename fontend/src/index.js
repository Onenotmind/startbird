import Vue from "vue"
// import './variables.scss';
import BbList from './components/bb-list/index.js';
import BbButton  from './components/bb-button/index.js';
import BbInputNumber from './components/bb-input-number/index.js'
import BbCheckbox from './components/Checkbox.vue'
// import BbMessageBox from './components/bb-message-box/index.js'
import BbTimeSelect from './components/bb-time-select/index.js'
import BbDialog from './components/bbdialog/common.js'
import bbloading from './components/bbloading/loading.js'
import toast from './components/toast/toast.js'
const YMUI = {
  BbButton,
  BbList,
  BbInputNumber,
  BbTimeSelect,
  BbCheckbox
}

const install = function(Vue, opts = {}) {
  if (install.installed) return
  Object.keys(YMUI).forEach(key => {
    Vue.component(key, YMUI[key])
  })

  Vue.prototype.$toast = toast
  Vue.prototype.$bbloading = bbloading
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue) // 通过use方式全部引入
}

const Components = {
  BbButton,
  BbList,
  BbInputNumber,
  BbTimeSelect,
  BbCheckbox,
  install
}

export default Components;
