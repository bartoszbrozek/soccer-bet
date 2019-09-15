<template>
  <div>
    <h1 class="title">Leaderboard</h1>

    <LeaderBoardTable />
  </div>
</template>

<script>
import LeaderBoardTable from "./Room/Tables/LeaderBoardTable";

export default {
  name: "LeaderBoard",
  components: {
    LeaderBoardTable
  },
  mounted() {

  }
};
</script>
