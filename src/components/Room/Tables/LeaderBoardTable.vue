<template>
  <section>
    <b-field grouped group-multiline>
      <b-select v-model="perPage" :disabled="!isPaginated">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
      </b-select>
    </b-field>

    <b-table
      :data="data"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="room.uid"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <template slot-scope="props">
        <b-table-column field="id" label="Name" sortable>{{ props.row.displayName }}</b-table-column>

        <b-table-column field="score" label="Score" sortable>{{ props.row.score }}</b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 10
    };
  },
  mounted: function() {
    var self = this
    this.$store.dispatch("leaderboard/fetchLeaderboard").then(function() {
      self.$emit("tableRefreshed");
    });

    this.$parent.$on("refreshTable", function() {
      this.$store.dispatch("leaderboard/fetchLeaderboard").then(function() {
        self.$emit("tableRefreshed");
      });
    });
  },
  computed: mapGetters({
    data: "leaderboard/getLeaderboard"
  })
};
</script>