// IMPORTS
import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login'
import HomePage from './components/HomePage'
import NewRoom from './components/Room/NewRoom'
import ExistingRoom from './components/Room/ExistingRoom'
import GameRoom from './components/Room/GameRoom'
import LeaderBoard from './components/LeaderBoard'
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
  },
  {
    path: '/room/:id',
    component: GameRoom,
    props: true
  },
  {
    path: '/leaderboard',
    component: LeaderBoard
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  var user = store.getters['user/getData']
  if (!user || !user.email) {
    if (to.path !== "/login") {
      next("/login")
      return
    }
  }
  next()
})
// VUE RENDER
const vm = new Vue({
  router,
  store,
  create() {

  },
  render: h => h(App),
}).$mount('#app')

const toast = vm.$buefy.toast


export {
  vm,
  toast
}