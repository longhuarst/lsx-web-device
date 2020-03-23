import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// import axios from '@/axios/axios'
//
// Vue.prototype.$axiso = axios;



//ant design vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);



// import {post} from '@/axios/axios.ts';
// Vue.prototype.$axios = post;


// //element ui
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);


import axios from '@/axios/axios.ts';
Vue.prototype.$axios = axios;



// import clipboard from 'clipboard';
// //注册到vue原型上
// Vue.prototype.clipboard = clipboard;
//复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)



new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    console.log('main.ts created');
    this.$store.commit('onInit');
  }
}).$mount('#app')
