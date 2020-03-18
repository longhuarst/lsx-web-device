import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      token: null,
      role: null,
    }
  },
  mutations: {
    onInit(state){
      console.log('onInit()')
      let x = localStorage.getItem('user');
      if (x != null){
        state.user = JSON.parse(x);
      }
      console.log(state)
    },
    setToken(state, token){
      state.user.token = token;
    },
    setTokenRemember(state, token){
      state.user.token = token;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setRole(state, role){
      state.user.role = role;
    },
    setRoleRemember(state, role){
      state.user.role = role;
      localStorage.setItem('user', JSON.stringify(state.user));
    },


  },
  actions: {
  },
  modules: {
  }
})
