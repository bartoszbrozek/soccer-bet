<template>
  <div>
    <h1 class="title">List of existing rooms</h1>
    <ExistingRoomsTable></ExistingRoomsTable>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ExistingRoomsTable from "./Tables/ExistingRoomsTable";

export default {
  name: "ExistingRoom",
  components: {
    ExistingRoomsTable
  },
  data() {
    return {};
  }
};
</script>
