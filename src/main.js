// IMPORTS
import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login'
import HomePage from './components/HomePage'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueRouter from 'vue-router'
import store from './store'
import Firebase from './helpers/firebase'

Vue.config.productionTip = false

// UI CONFIG
Vue.use(Buefy)

// ROUTER CONFIG
Vue.use(VueRouter)
const routes = [{
    path: '/homepage',
    component: HomePage
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

// VUE RENDER
const vm = new Vue({
  router,
  store,
  create() {
    store.commit("user/checkLoginStatus")
  },
  render: h => h(App),
}).$mount('#app')

export {vm}