import Vue from 'vue'

let ToastConstructor = Vue.extend(require('./toast.vue').default) // 直接将Vue组件作为Vue.extend的参数

let tId = 1

let Toast = (params) => {
  let id = 'toast-' + tId++
  let ToastInstance = new ToastConstructor({
    data: {
      params: params
    }
  }) // 实例化一个带有content内容的Notice

  ToastInstance.vm = ToastInstance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
  ToastInstance.id = id
  ToastInstance.vm.visible = true
  ToastInstance.dom = ToastInstance.vm.$el
  document.body.appendChild(ToastInstance.dom) // 将dom插入body
  ToastInstance.dom.style.zIndex = tId + 1001 // 后插入的Toast组件z-index加一，保证能盖在之前的上面
  return ToastInstance.vm
}
export {
  Toast
}
export default {
  install: Vue => {
    Vue.prototype.$toast = Toast // 将Toast组件暴露出去，并挂载在Vue的prototype上
  }
}
