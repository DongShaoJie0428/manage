// 引入api 方法
import { userList, userUpdata, deleteUserInfo } from '@/api/user'

const state = {
  list: []
}

const mutations = {
  updataList(state, action) {
    state.list = action
  }
}

const actions = {
  // 获取用户信息
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
  },
  // 修改用户信息
  updataList({ commit }, action) {
    return new Promise((resolve, reject) => {
      userUpdata(action).then(res => {
        if (res.data.code === 1) {
          resolve(res.data.msg)
        } else {
          reject(res.data.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 删除用户信息
  deleteUser({ commit }, action) {
    return new Promise((resolve, reject) => {
      deleteUserInfo(action).then(res => {
        if (res.data.code === 1) {
          resolve(res.data.msg)
        } else {
          reject(res.data.msg)
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
