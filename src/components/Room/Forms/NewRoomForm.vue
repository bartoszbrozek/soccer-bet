<template>
  <section>
    <b-field label="Name">
      <b-input v-model="name"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input v-model="password" type="password" password-reveal></b-input>
    </b-field>

    <b-field label="Description">
      <b-input v-model="description" maxlength="200" type="textarea"></b-input>
    </b-field>

    <b-button type="is-primary" @click="createRoom" v-bind:loading="this.isAddingNewRoom">Confirm</b-button>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: mapActions("room", ["createRoom"]),
  computed: {
    name: {
      get() {
        return this.$store.state.room.name;
      },
      set(value) {
        this.$store.commit("room/updateName", value);
      }
    },
    password: {
      get() {
        return this.$store.state.room.password;
      },
      set(value) {
        this.$store.commit("room/updatePassword", value);
      }
    },
    description: {
      get() {
        return this.$store.state.room.description;
      },
      set(value) {
        this.$store.commit("room/updateDescription", value);
      }
    },

    ...mapGetters({
      isAddingNewRoom: "room/isAddingNewRoom"
    })
  }
};
</script>
