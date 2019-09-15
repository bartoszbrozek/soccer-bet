<template>
  <section>
    <b-field label="Minute">
      <b-input v-model="minute" value="1" min="1" max="120" type="number"></b-input>
    </b-field>

    <b-button
      type="is-primary"
      @click="addMinute(id)"
      v-bind:loading="this.isAddingNewMinute"
    >Confirm</b-button>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
        modal: this.$parent
    };
  },
  props: ["id"],
  methods: {
    addMinute: function(roomID) {
        this.$store.dispatch('room/addMinute', {
            id: roomID
        })

        // Close modal
        this.$parent.close()
    }
  },
  mounted: function() {
    this.$store.commit("room/updateNewMinute", null);
  },
  computed: {
    minute: {
      get() {
        return this.$store.state.room.newMinute;
      },
      set(value) {
        this.$store.commit("room/updateNewMinute", value);
      }
    },
    ...mapGetters({
      isAddingNewMinute: "room/isAddingNewMinute"
    })
  }
};
</script>
