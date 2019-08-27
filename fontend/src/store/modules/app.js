import * as mutTypes from '../mutation-types.js'

const state = {
  
}

const actions = {
  
}

const mutations = {
  [mutTypes.CHANGE_CUR_INDEX] (state, { index }) {
    state.curindex = index
  }
}

/**
  * 推荐使用getters将所需数据返回给vue组件
  */
const getters = {
  
}

export default {
  getters,
  state,
  actions,
  mutations
}
