import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
    adminToken: '',
    adminInfo: JSON.parse(sessionStorage.getItem('adminInfo'))
  },
  getters: {
    //get
    getUser: state => {
      return state.userInfo
    },
    getAdmin: state => {
      return state.adminInfo
    }
  },
  mutations: {
    //setUser
    SET_TOKEN: (state,token) => {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));//存入session缓存
    },
    REMOVE_INFO: (state) => {
      localStorage.setItem("token", '')
      sessionStorage.setItem("userInfo", JSON.stringify(''))
      state.userInfo = {}
    },
    //setAdmin
    SET_ADMINTOKEN: (state,token) => {
      state.adminToken = token;
      localStorage.setItem("adminToken", token);
    },
    SET_ADMININFO: (state, userInfo) => {
      state.adminInfo = userInfo;
      sessionStorage.setItem("adminInfo", JSON.stringify(userInfo));//存入session缓存
    },
    REMOVE_ADMININFO: (state) => {
      localStorage.setItem("adminToken", '')
      sessionStorage.setItem("adminInfo", JSON.stringify(''))
      state.adminInfo = {}
    },
  },
  actions: {
  },
  modules: {
  }
})
