<template>
  <section>
    <b-field grouped group-multiline>
      <b-select v-model="defaultSortDirection">
        <option value="asc">Default sort direction: ASC</option>
        <option value="desc">Default sort direction: DESC</option>
      </b-select>
      <b-select v-model="perPage" :disabled="!isPaginated">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
      </b-select>
      <div class="control">
        <button class="button" @click="currentPage = 2" :disabled="!isPaginated">Set page to 2</button>
      </div>
      <div class="control is-flex">
        <b-switch v-model="isPaginated">Paginated</b-switch>
      </div>
      <div class="control is-flex">
        <b-switch v-model="isPaginationSimple" :disabled="!isPaginated">Simple pagination</b-switch>
      </div>
      <b-select v-model="paginationPosition" :disabled="!isPaginated">
        <option value="bottom">bottom pagination</option>
        <option value="top">top pagination</option>
        <option value="both">both</option>
      </b-select>
      <b-select v-model="sortIcon">
        <option value="arrow-up">Arrow sort icon</option>
        <option value="menu-up">Caret sort icon</option>
        <option value="chevron-up">Chevron sort icon</option>
      </b-select>
      <b-select v-model="sortIconSize">
        <option value="is-small">Small sort icon</option>
        <option value>Regular sort icon</option>
        <option value="is-medium">Medium sort icon</option>
        <option value="is-large">Large sort icon</option>
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
        <b-table-column field="id" label="ID" width="40" sortable numeric>{{ props.row.uid }}</b-table-column>

        <b-table-column field="uid" label="UID" sortable>{{ props.row.uid }}</b-table-column>

        <b-table-column field="name" label="Name" sortable>{{ props.row.name }}</b-table-column>
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
      perPage: 5
    };
  },
  mounted: function() {
    this.$store.dispatch("room/getRooms");
  },
  methods: mapActions("room", ["getRooms"]),
  computed: mapGetters({
    data: "room/getRooms"
  })
};
</script>