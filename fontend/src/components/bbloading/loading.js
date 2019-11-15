import Vue from 'vue'
const LoadingConstructor = Vue.extend(require('./loading.vue').default)

let Loading = (params) => {
  let LoadingInstance = new LoadingConstructor({
    data: {
      params: params
    }
  }) // 实例化一个带有content内容的Loading
  LoadingInstance.vm = LoadingInstance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
  LoadingInstance.dom = LoadingInstance.vm.$el
  document.body.appendChild(LoadingInstance.dom) // 将dom插入body
  return LoadingInstance.vm
}
let LoadingShow = (params) => {
  let LoadingInstance = new LoadingConstructor({
    data: {
      params: Object.assign({ fullscreen: true }, params)
    }
  })

  LoadingInstance.vm = LoadingInstance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
  LoadingInstance.dom = LoadingInstance.vm.$el
  document.body.appendChild(LoadingInstance.dom) // 将dom插入body
  return LoadingInstance.vm
}
// let LoadingClose = () => {
//   console.error('LoadingShow',LoadingShow)
//   LoadingShow({fullscreen: false})
//   // let LoadingInstance = new LoadingConstructor({
//   //   data: {
//   //     params: Object.assign({fullscreen: false,text: '加载'},params)
//   //   }
//   // })

//   // LoadingInstance.vm = LoadingInstance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
//   // LoadingInstance.dom = LoadingInstance.vm.$el
//   // document.body.appendChild(LoadingInstance.dom) // 将dom插入body
//   // return LoadingInstance.vm
// }

export default {
  install: Vue => {
    // console.error('Loading',Loading)
    Vue.prototype.$bbloading = Loading // 将Loading组件暴露出去，并挂载在Vue的prototype上
    Vue.prototype.$bbloading.show = LoadingShow
    // Vue.prototype.$bbloading.close = LoadingClose
    Vue.directive('bb-loading', {
      bind: (el, binding) => {
        const loading = new LoadingConstructor({
          el: document.createElement('div'),
          data: {
            text: el.getAttribute('bb-loading-text'),
            fullscreen: !!binding.modifiers.fullscreen
          }
        })
        el.instance = loading
        el.loading = loading.$el
        el.loadingStyle = {}
        toggleLoading(el, binding)
      },
      update: (el, binding) => {
        // el.instance.setText(el.getAttribute('bb-loading-text'))
        el.instance.text = el.getAttribute('bb-loading-text')
        if (binding.oldValue !== binding.value) {
          toggleLoading(el, binding)
        }
      },
      unbind: (el, binding) => {
        if (el.domInserted) {
          document.body.removeChild(el.loading)
        } else {
          el.loading && el.loading.parentNode && el.loading.parentNode.removeChild(el.loading)
        }
      }
    })
    const toggleLoading = (el, binding) => {
      if (binding.value) {
        Vue.nextTick(() => {
          if (binding.modifiers.fullscreen) {
            el.orginalPosition = document.body.style.position
            el.originalOverflow = document.body.style.overflow
            inserDom(document.body, el, binding)
          } else {
            el.originalPosition = el.style.position
            inserDom(el, el, binding)
          }
        })
      } else {
        if (el.domVisible) {
          el.instance.$on('after-leave', () => {
            el.domVisible = false
            if (binding.modifiers.fullscreen) {
              document.body.style.overflow = el.originalOverflow
            }
            if (binding.modifiers.fullscreen) {
              document.body.style.position = el.originalPosition
            } else {
              el.style.position = el.originalPosition
            }
          })
          el.instance.visible = false
        }
      }
    }
    const inserDom = (parent, el, binding) => {
      if (!el.domVisible) {
        Object.keys(el.loadingStyle).forEach(property => {
          el.loading.style[property] = el.loadingStyle[property]
        })
        if (el.originalPosition !== 'absolute') {
          parent.style.position = 'relative'
        }
        if (binding.modifiers.fullscreen) {
          parent.style.overflow = 'hidden'
        }
        el.domVisible = true
        parent.appendChild(el.loading)
        Vue.nextTick(() => {
          el.instance.visible = true
        })
        el.domInserted = true
      }
    }
  }
}
