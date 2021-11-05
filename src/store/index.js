import Vue from 'vue'
import Vuex from 'vuex'


import { getUserInfoAPI, getUserProfileAPI } from '../api/userAPI'

Vue.use(Vuex)

// 1.定义一个initstate为一个对象
const initState = {
  tokenInfo: {
    token: '',
    refresh_token: ''
  },
  userInfo: {},
  // 用户的简介信息
  userProfile: {}
}

// 2.直接从localstorage中获取 tokenInfo
const stateStr = window.localStorage.getItem('state')

// console.log(stateStr) // 空(null) 或者 {"tokenInfo":{"token":"967fea98-fdf9-4076-b08c-b05bdc04f835","refresh_token":"851510b5-0615-444a-b6a4-c30d4118d4fd"}}

// 3.把获取到的值赋值给第一步定义的initstate
if (stateStr !== null) {
  initState.tokenInfo = JSON.parse(stateStr).tokenInfo
}

export default new Vuex.Store({
  state: {
    tokenInfo: initState.tokenInfo,
    userInfo: initState.userInfo,
    userProfile: initState.userProfile
  },
  mutations: {
    updateTokenInfo (state, payload) {
      state.tokenInfo = payload
      this.commit('saveStateStorage')
      // console.log('state中存的tokenInfo', state.tokenInfo)
    },
    // 获取的token信息，存储到localStorage中
    saveStateStorage (state) {
      window.localStorage.setItem('state', JSON.stringify(state))
    },
    // 清除 tokeninfo localStorage中的token
    cleanTokenInfo (state) {
      state.tokenInfo = {
        token: '',
        refresh_token: ''
      }
      localStorage.removeItem('state')
    },
    // 更新用户数据的
    updateUserInfo (state, payload) {
      state.userInfo = payload
    },
    cleanLoginState (state) {
      state.tokenInfo = {}
      state.userInfo = {}
      state.userProfile = {}
      this.commit('cleanTokenInfo')
    },
    updateUserProfile (state, payload) {
      state.userProfile = payload
    }
  },
  actions: {
    async getUserInfo (ctx) {
      // console.log('aaa')
      const { data: res } = await getUserInfoAPI()
      if (res.message === 'OK') {
        // console.log(res)
        ctx.commit('updateUserInfo', res.data)
        // console.log(this.state)
      }
    },
    async getUserProfile (ctx) {
      const { data: res } = await getUserProfileAPI()
      if (res.message === 'OK') {
        // console.log(res)
        ctx.commit('updateUserProfile', res.data)
      }
    }
  },
  modules: {
  }
})
