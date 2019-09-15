import FirebaseHelper from '../../helpers/firebase'
import {
    vm,
    toast
} from '@/main'

const Firebase = FirebaseHelper.firebase

const state = {
    name: "",
    password: "",
    description: "",
    isAddingNewRoom: false,
    isAddingNewMinute: false,

    // Available Rooms
    rooms: [],

    // Game Data
    firstMinute: 0,
    secondMinute: 0,
    isAcceptingMinutes: false,
    currentRoom: {
        name: "",
        description: "",
        uid: "",
        minutes: []
    },
    bets: {},
    newMinute: null
}

// getters
const getters = {
    isAddingNewRoom: (state) => {
        return state.isAddingNewRoom
    },
    isAddingNewMinute: (state) => {
        return state.isAddingNewMinute
    },
    getRooms: (state) => {
        var obj = state.rooms

        var rooms = Object.keys(obj).map(function (key) {
            return obj[key];
        });

        return rooms
    },
    isAcceptingMinutes: (state) => {
        return state.isAcceptingMinutes
    },
    getRoom: (state) => {
        return state.currentRoom
    },
    getBets: (state) => {
        var obj = state.bets

        var bets = Object.keys(obj).map(function (key) {
            return obj[key];
        });

        return bets
    },
    getMyBet: (state) => {
        var obj = state.bets

        var bets = Object.keys(obj).map(function (key) {
            return obj[key];
        });

        var user = vm.$store.getters['user/getData']
        var myBet = bets.filter(bet => {
            return bet.user.uid === user.uid
        });


        if (myBet && typeof myBet[0] !== "undefined") {
            myBet = myBet[0]
        } else {
            myBet = []
        }

        return myBet;
    },
    currentUserIsRoomOwner: (state) => {
        var currentRoom = state.currentRoom
        var currentUser = vm.$store.getters['user/getData']

        return currentRoom.uid === currentUser.uid;
    }
}

// actions
const actions = {
    createRoom({
        commit,
        rootState
    }) {
        commit("isAddingNewRoom", true)
        var user = rootState.user.user

        var newRoomID = Firebase.database().ref().child('rooms').push().key;
        Firebase.database().ref('rooms/' + newRoomID).set({
            name: state.name,
            password: state.password,
            description: state.description,
            timestamp: Date.now(),
            uid: user.uid
        }, error => {
            commit("isAddingNewRoom", false)

            if (error) {
                console.log(error)
            } else {
                // Also, add a new user
                Firebase.database().ref('users/' + user.uid).set(user, error => {
                    if (error) {
                        console.log(error)
                    } else {
                        vm.$router.push("/room/existing")
                    }
                });
            }

        });
    },

    getRooms({
        commit
    }) {
        // Join two tables and Listen for changes
        var rooms = Firebase.database().ref('rooms');
        var users = Firebase.database().ref('users');

        users.once('value').then(function (snapshot) {
            var users = snapshot.val()

            rooms.on('value', function (snapshot) {
                let snapshotRooms = snapshot.val()

                var availableRooms = Object.keys(snapshotRooms).map(function (key) {
                    let uid = snapshotRooms[key].uid
                    snapshotRooms[key].user = users[uid]
                    snapshotRooms[key].roomID = key
                    return snapshotRooms[key];
                });

                commit("updateRooms", availableRooms)
            });
        });
    },

    createBet({
        commit,
        rootState
    }, roomID) {
        commit("isAcceptingMinutes", true)

        var user = rootState.user.user

        Firebase.database().ref('bets/' + roomID + '/' + user.uid).set({
            firstMinute: state.firstMinute,
            secondMinute: state.secondMinute,
        }, error => {
            commit("isAcceptingMinutes", false)

            if (error) {
                console.log(error)
            } else {
                // Also, add a new user
                Firebase.database().ref('users/' + user.uid).set(user, error => {
                    if (error) {
                        console.log(error)
                    }
                });
            }

        });
    },

    getRoom({
        commit,
        rootState
    }, roomID) {
        var roomsTable = Firebase.database().ref('rooms');
        roomsTable.child(roomID).on('value', function (snapshot) {
            commit("setRoom", snapshot.val())
        });
    },
    getBets({
        commit
    }, roomID) {
        commit("setBets", [])
        var betsTable = Firebase.database().ref('bets');
        var usersTable = Firebase.database().ref('users');

        usersTable.once('value').then(function (snapshot) {
            var users = snapshot.val()

            betsTable.child(roomID).on('value', function (betsSnapshoot) {
                var bets = betsSnapshoot.val()

                if (bets) {
                    var currentBets = Object.keys(bets).map(function (key) {
                        let uid = key
                        bets[key].user = users[uid]
                        return bets[key];
                    });

                    commit("setBets", currentBets)
                }
            })
        })
    },

    addMinute({
        commit
    }, room) {
        commit("isAddingNewMinute", true)

        Firebase.database().ref('rooms/' + room.id + '/minutes/' + state.newMinute).set({
            timestamp: Date.now()
        }, error => {
            commit("isAddingNewMinute", false)

            if (error) {
                toast.open({
                    message: 'Something went wrong',
                    type: 'is-danger'
                })
            }
        });

        toast.open({
            message: 'Minute Added',
            type: 'is-success'
        })

        commit("updateNewMinute", null)
    },

    removeMinute({
        commit
    }, data) {
        var roomID = data.id
        var minute = data.minute

        Firebase.database().ref('rooms/' + roomID + '/minutes/' + minute).set(null, error => {

            if (error) {
                toast.open({
                    message: 'Something went wrong',
                    type: 'is-danger'
                })
            }
        });

        toast.open({
            message: 'Minute Removed',
            type: 'is-success'
        })
    }
}

// mutations
const mutations = {
    updateName(state, name) {
        state.name = name
    },
    updatePassword(state, password) {
        state.password = password
    },
    updateDescription(state, description) {
        state.description = description
    },
    isAddingNewRoom(state, value) {
        state.isAddingNewRoom = value
    },
    updateRooms(state, rooms) {
        state.rooms = rooms
    },
    setRoom(state, room) {
        state.currentRoom = room
    },
    setBets(state, room) {
        state.bets = room
    },
    isAcceptingMinutes(state, value) {
        state.isAcceptingMinutes = value
    },
    isAddingNewMinute(state, value) {
        state.isAddingNewMinute = value
    },
    updateFirstMinute(state, value) {
        state.firstMinute = value
    },
    updateSecondMinute(state, value) {
        state.secondMinute = value
    },
    updateNewMinute(state, value) {
        state.newMinute = value
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}