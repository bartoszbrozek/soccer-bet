import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import room from './modules/room'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user,
        room
    },
    strict: debug,
    plugins: debug ? [] : []
})