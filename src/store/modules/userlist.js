// 引入api 方法
import { userList } from '@/api/user'

const state = {
  list: []
}

const mutations = {
  updataList(state, action) {
    state.list = action
  }
}

const actions = {
  getUserList({ commit }, query) {
    console.log('query...', query)
    return new Promise((resolve, reject) => {
      userList(query).then(res => {
        console.log('res...', res)
        if (res.data.code === 1) {
          commit('updataList', res.data.data.list)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
