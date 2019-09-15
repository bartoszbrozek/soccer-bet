<template>
  <section>
      <b-taglist>
      <b-tag
        v-for="(object, minute) in minutes"
        v-bind:key="minute.index"
        type="is-primary"
        :closable="currentUserIsRoomOwner"
        aria-close-label="Remove"
        @close="removeMinute({id, minute})"
      >{{minute}}</b-tag>
      </b-taglist>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  props: ["id", "minutes"],
  computed: {
    ...mapGetters({
      currentUserIsRoomOwner: "room/currentUserIsRoomOwner"
    })
  },
    methods: mapActions("room", ["removeMinute"]),
};
</script>