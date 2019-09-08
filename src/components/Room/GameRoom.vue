<template>
  <div>
    <h3>Room {{currentRoom.name}} ID#{{ id }}</h3>
    <h4>{{currentRoom.description}}</h4>
    <GameRoomForm v-if="!myBet.user" :id="id"></GameRoomForm>
    <CurrentGameTable :id="id"></CurrentGameTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GameRoomForm from "./Forms/GameRoomForm";
import CurrentGameTable from "./Tables/CurrentGameTable";

export default {
  name: "GameRoom",
  components: { GameRoomForm, CurrentGameTable },
  props: ["id"],
  data() {
    return {
      showGameRoomForm: false
    };
  },
  mounted: function() {
    this.$store.dispatch("room/getRoom", this.id);
  },
  computed: {
    ...mapGetters({
      currentRoom: "room/getRoom",
      myBet: "room/getMyBet"
    })
  }
};
</script>
