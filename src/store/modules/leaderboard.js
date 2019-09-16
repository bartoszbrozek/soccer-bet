import FirebaseHelper from '../../helpers/firebase'
import {
    vm,
    toast
} from '@/main'

const Firebase = FirebaseHelper.firebase

const state = {
    leaderboard: [],
    isLeaderboardRefreshing: false
}

const PERFECT_MINUTE_HIT_POINTS = 2
const NEAR_MINUTE_HIT_POINTS = 1

// getters
const getters = {
    getLeaderboard: (state) => {
        var obj = state.leaderboard

        var leaderboard = Object.keys(obj).map(function (key) {
            return obj[key];
        });

        return leaderboard
    },
    isLeaderboardRefreshing: (state) => {
        return state.isLeaderboardRefreshing
    }
}

// actions
const actions = {
    fetchLeaderboard({
        dispatch,
        commit
    }) {
        dispatch("fetchLeaderboardFromAPI").then(function () {
            toast.open({
                message: "Data Refreshed",
                type: "is-success"
            })
        })
    },
    fetchLeaderboardFromAPI({
        commit
    }) {

        // Join two tables and Listen for changes
        var roomsTable = Firebase.database().ref('rooms');
        var usersTable = Firebase.database().ref('users');
        var betsTable = Firebase.database().ref('bets');
        var users = []

        usersTable.once('value').then(function (snapshot) {

            var usersTmp = snapshot.val()

            Object.keys(usersTmp).map(function (key) {
                usersTmp[key].score = 0
                users[key] = usersTmp[key]
            })

            roomsTable.once('value').then(function (snapshot) {
                let snapshotRooms = snapshot.val()

                Object.keys(snapshotRooms).map(function (key) {
                    let roomID = key
                    let minutesInRoom = snapshotRooms[roomID].minutes

                    if (typeof minutesInRoom === "undefined") {
                        minutesInRoom = []
                    }

                    // JOIN WITH BETS
                    betsTable.child(roomID).once('value').then(function (betsSnapshoot) {
                        var bets = betsSnapshoot.val()

                        if (bets) {
                            Object.keys(bets).map(function (key) {
                                var uid = key
                                var bet = bets[key]

                                Object.keys(minutesInRoom).map((minute) => {
                                    minute = parseInt(minute)
                                    bet.firstMinute = parseInt(bet.firstMinute)
                                    bet.secondMinute = parseInt(bet.secondMinute)
                                    if (minute === bet.firstMinute || minute === bet.secondMinute) {
                                        users[uid].score += PERFECT_MINUTE_HIT_POINTS
                                    } else if (
                                        minute - 1 === bet.firstMinute ||
                                        minute + 1 === bet.firstMinute ||
                                        minute - 1 === bet.secondMinute ||
                                        minute + 1 === bet.secondMinute
                                    ) {
                                        users[uid].score += NEAR_MINUTE_HIT_POINTS
                                    }

                                    commit("updateLeaderboard", users)
                                })
                            });
                        }
                    })
                });

            });
        })

        return users;
    },

}

// mutations
const mutations = {
    updateLeaderboard(state, leaderboard) {
        state.leaderboard = leaderboard
    },
    isLeaderboardRefreshing(state, value) {
        state.isLeaderboardRefreshing = value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}