<template>
  <div>
    <div class="columns">
      <div class="column">
        <h1 class="title">Leaderboard</h1>
      </div>
      <div class="column">
        <b-button
          type="is-info is-pulled-right"
          v-bind:loading="this.isLeaderboardRefreshing"
          @click="refreshTable"
        >Refresh</b-button>
      </div>
    </div>

    <LeaderBoardTable @tableRefreshed="tableRefreshed()" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LeaderBoardTable from "./Room/Tables/LeaderBoardTable";

export default {
  name: "LeaderBoard",
  data() {
    return {
      isLeaderboardRefreshing: false
    }
  },
  components: {
    LeaderBoardTable
  },
  methods: {
    refreshTable: function() {
      this.isLeaderboardRefreshing = true
      this.$emit("refreshTable");
    },
    tableRefreshed: function() {
      console.log("TABLE REFRESHED")
      this.isLeaderboardRefreshing = false
    }
  },
  mounted() {},
};
</script>
