<template>
  <div>
    <div class="level">
      <section>
        <h1 class="title">Room {{currentRoom.name}}</h1>
      </section>
    </div>
    <div class="level" v-if="currentRoom.description">
      <section>
        <h2 class="subtitle">{{currentRoom.description}}</h2>
      </section>
    </div>

    <div class="level">
      <section>
        <b-tag type="is-primary" v-if="currentUserIsRoomOwner">You Are Room Owner</b-tag>
      </section>
    </div>

    <div class="level" v-if="currentUserIsRoomOwner">
      <AddMinuteModal :id="id"></AddMinuteModal>
    </div>

    <div class="container">
      <GameRoomForm v-if="!myBet.user" :id="id"></GameRoomForm>
      <CurrentGameTable :id="id"></CurrentGameTable>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GameRoomForm from "./Forms/GameRoomForm";
import CurrentGameTable from "./Tables/CurrentGameTable";
import AddMinuteModal from "./Modals/AddMinuteModal";

export default {
  name: "GameRoom",
  components: { GameRoomForm, CurrentGameTable, AddMinuteModal },
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
      myBet: "room/getMyBet",
      currentUserIsRoomOwner: "room/currentUserIsRoomOwner"
    })
  }
};
</script>
