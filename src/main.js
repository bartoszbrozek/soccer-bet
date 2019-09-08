// IMPORTS
import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login'
import HomePage from './components/HomePage'
import NewRoom from './components/Room/NewRoom'
import ExistingRoom from './components/Room/ExistingRoom'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueRouter from 'vue-router'
import store from './store'

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
  },
  {
    path: '/room/new',
    component: NewRoom
  },
  {
    path: '/room/existing',
    component: ExistingRoom
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

  },
  render: h => h(App),
}).$mount('#app')

export {
  vm
}