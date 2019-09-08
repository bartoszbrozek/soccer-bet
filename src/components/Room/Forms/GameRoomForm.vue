<template>
  <section>
    <b-field label="First Minute">
      <b-input v-model="firstMinute" value="1" min="1" max="120" type="number"></b-input>
    </b-field>

    <b-field label="Second Minute">
      <b-input v-model="secondMinute" value="1" min="1" max="120" type="number"></b-input>
    </b-field>

    <b-button type="is-primary" @click="createBet(id)" v-bind:loading="this.isAcceptingMinutes">Confirm</b-button>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: ['id'],
  methods: mapActions("room", ["createBet"]),
  computed: {
    firstMinute: {
      get() {
        return this.$store.state.room.firstMinute;
      },
      set(value) {
        this.$store.commit("room/updateFirstMinute", value);
      }
    },
    secondMinute: {
      get() {
        return this.$store.state.room.secondMinute;
      },
      set(value) {
        this.$store.commit("room/updateSecondMinute", value);
      }
    },

    ...mapGetters({
      isAcceptingMinutes: "room/isAcceptingMinutes"
    })
  }
};
</script>
