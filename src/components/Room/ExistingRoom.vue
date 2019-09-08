<template>
  <div>
    <h2>List of existing rooms</h2>
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
