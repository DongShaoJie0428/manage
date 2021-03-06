import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

// 引入用户列表
import userlist from './modules/userlist'

// 引入用户更改信息
import updatalist from './modules/updatalist'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    userlist,
    updatalist
  },
  getters
})

export default store
