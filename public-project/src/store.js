import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is_login:false,
    token:window.sessionStorage.getItem("token"),
    username:window.sessionStorage.getItem("username")
  },
  getters:{
    is_login:state=>state.is_login,
    token:state=>state.token,
    username:state=>state.username
  },
  mutations: {
    //设置登录状态
    set_login(state){
      state.is_login=true;
    },
    //设置用户名
    set_username(state,username){
     state.username=username;
    },
    set_token(state,token){
     state.token=token;
    }
  },
  actions: {

  }
})
