import { userUpdata } from '@/api/user'

const state = {

}

const mutations = {

}

const actions = {
  updataList({ commit }, action) {
    return new Promise((resolve, reject) => {
      userUpdata(action).then(res => {
        console.log(res, '...res')
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default{
  namespaced: true,
  state,
  mutations,
  actions
}
