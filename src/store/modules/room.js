import FirebaseHelper from '../../helpers/firebase'
import {
    vm
} from '@/main'

const Firebase = FirebaseHelper.firebase

const state = {
    name: "",
    password: "",
    description: "",
    isAddingNewRoom: false,

    // Available Rooms
    rooms: []
}

// getters
const getters = {
    isAddingNewRoom: (state) => {
        return state.isAddingNewRoom
    },
    getRooms: (state) => {
        var obj = state.rooms

        var rooms = Object.keys(obj).map(function (key) {
            return obj[key];
        });

        console.log(rooms)

        return rooms
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
            commit("isAddingNewRoom", true)

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
                    return snapshotRooms[key];
                });

                commit("updateRooms", availableRooms)
            });
        });


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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}