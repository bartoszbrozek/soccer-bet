import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import room from './modules/room'
import leaderboard from './modules/leaderboard'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user,
        room,
        leaderboard
    },
    strict: debug,
    plugins: debug ? [] : []
})