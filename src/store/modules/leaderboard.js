import FirebaseHelper from '../../helpers/firebase'
import {
    vm,
    toast
} from '@/main'

const Firebase = FirebaseHelper.firebase

const state = {
    leaderboard: []
}

// getters
const getters = {
    getLeaderboard: (state) => {
        var obj = state.leaderboard

        var leaderboard = Object.keys(obj).map(function (key) {
            return obj[key];
        });

        return leaderboard
    }
}

// actions
const actions = {
    fetchLeaderboard({
        dispatch,
        commit
    }) {
        commit("updateLeaderboard", [])
        dispatch("fetchLeaderboardFromAPI")
    },
    fetchLeaderboardFromAPI({
        commit
    }) {
        // Join two tables and Listen for changes
        var roomsTable = Firebase.database().ref('rooms');
        var usersTable = Firebase.database().ref('users');
        var betsTable = Firebase.database().ref('bets');
        var users = []

         usersTable.on('value', function (snapshot) {
            var usersTmp = snapshot.val()

            Object.keys(usersTmp).map(function (key) {
                usersTmp[key].score = 0
                users[key] = usersTmp[key]
            })

            roomsTable.on('value', function (snapshot) {
                let snapshotRooms = snapshot.val()

                Object.keys(snapshotRooms).map(function (key) {
                    let roomID = key
                    let minutesInRoom = snapshotRooms[roomID].minutes

                    if (typeof minutesInRoom === "undefined") {
                        minutesInRoom = []
                    }

                    // JOIN WITH BETS
                    betsTable.child(roomID).on('value', function (betsSnapshoot) {
                        var bets = betsSnapshoot.val()

                        if (bets) {
                            Object.keys(bets).map(function (key) {
                                var uid = key
                                var bet = bets[key]

                                Object.keys(minutesInRoom).map((minute) => {
                                    if (minute === bet.firstMinute) {
                                        users[uid].score += 1
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
        console.log("UPDATE LEADERBOARD", leaderboard)
        state.leaderboard = leaderboard
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}