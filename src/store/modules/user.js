import Firebase from '../../helpers/firebase'
import {
    vm
} from '@/main'

const state = {
    user: {
        email: "",
        displayName: "",
        uid: "",
        photoURL: ""
    },
    token: null,
    isLogging: false,
    error: null
}

// getters
const getters = {
    getData: (state) => {
        return state.user
    },
    getToken: (state) => {
        return state.token
    },
    isLogging: (state) => {
        return state.isLogging
    }
}

// actions
const actions = {
    handleLogin({
        commit
    }) {
        commit('setLoggingStatus', true)
        const FacebookProvider = Firebase.providers.Facebook;

        Firebase.firebase.auth()
            .signInWithPopup(FacebookProvider)
            .then(function (result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var facebookUser = result.user;

                if (facebookUser) {
                    commit('setUser', {
                        email: facebookUser.email,
                        photoURL: facebookUser.photoURL,
                        displayName: facebookUser.displayName,
                        uid: facebookUser.uid
                    })
                    commit('setToken', token)
                    //vm.$router.push("/homepage");
                }
            })
            .catch(function (error) {
                commit('setError', error)
                console.log("ERROR", error);
            })
            .finally(function () {
                commit('setLoggingStatus', false)
            });
    },
    handleLogout({
        commit
    }) {
        Firebase.firebase.auth().signOut().then(function () {
            commit("setUser", null)
            if (vm.$router.currentRoute.path !== "/login") {
                vm.$router.push("/login")
            }
        }).catch(function (error) {
            // An error happened.
        });
    },
    checkUserStatus({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    if (user) {
                        commit('setUser', {
                            email: user.email,
                            photoURL: user.photoURL,
                            displayName: user.displayName,
                            uid: user.uid
                        })
                        commit('setToken', user.refreshToken)
                    }
                    if (vm.$router.currentRoute.path !== "/homepage") {
                        vm.$router.push("/homepage")
                    }
                }
            });
        });
    },
}

// mutations
const mutations = {
    setLoggingStatus(state, isLogging) {
        state.isLogging = isLogging
    },
    setUser(state, user) {
        state.user = user
    },
    setToken(state, token) {
        state.token = token
    },
    setError(state, error) {
        state.error = error
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}