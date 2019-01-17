import { loginByUsername, logout, register, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import md5 from 'md5'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        // 因为要在后台登录我们要知道我们的用户名和密码
        // 而且密码是md5加密的。
        loginByUsername(username, md5(userInfo.password + '1606A')).then(response => {
          console.log(response, '...response')
          commit('SET_TOKEN', response.data.data.token)
          setToken(response.data.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 用户注册
    registerByUserName({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const { username, password, phone } = userInfo
        register(username, md5(password + '1606A'), phone).then(response => {
          console.log(response, '...response')
          if (response.data.code === 1) {
            commit('SET_TOKEN', 'admin')
            // 拦截 把值埋在cookie里面
            setToken('admin')
            resolve()
          } else {
            reject(response.data.msg)
          }
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          // 如果你显示登陆成功但是显示的面是一个小人走着，就是个人页面，就是你没有boss权限，要给自己添加一点权限管理。
          console.log(res, '///res')
          if (res.data.code === 1) {
            commit('SET_ROLES', res.data.data.access)
            commit('SET_NAME', res.data.data.username)
            commit('SET_AVATAR', res.data.data.avatar)
            commit('SET_INTRODUCTION', res.data.data.profile)
            resolve({ data: { roles: res.data.data.access }})
          } else {
            reject(res.data.msg)
          }
          // 由于mockjs 不支持自定义状态码只能这样hack
          // if (!response.data) {
          //   reject('Verification failed, please login again.')
          // }
          // const data = response.data

          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array!')
          // }

          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)
          // resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
