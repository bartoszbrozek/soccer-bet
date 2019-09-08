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
        var userID = rootState.user.user.uid

        var newRoomID = Firebase.database().ref().child('rooms').push().key;
        Firebase.database().ref('rooms/' + newRoomID).set({
            name: state.name,
            password: state.password,
            description: state.description,
            uid: userID
        }, error => {
            commit("isAddingNewRoom", true)

            if (error) {

            } else {
                vm.$router.push("/room/existing")
            }
            console.log(error)
        });
    },

    getRooms({
        commit
    }) {
        // Listen for changes
        var rooms = Firebase.database().ref('rooms');
        rooms.on('value', function (snapshot) {
            console.log("ROOMS UPDATE", rooms)
            console.log("SNAPSHOT", snapshot)

            commit("updateRooms", snapshot.val())
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