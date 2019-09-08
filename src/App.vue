<template>
  <div id="app">
    <div class="container">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img
              src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
            />
          </b-navbar-item>
        </template>
        <template slot="start">
          <b-navbar-item tag="router-link" to="/homepage" type="is-link">Homepage</b-navbar-item>
          <b-navbar-item href="#">Documentation</b-navbar-item>
          <b-navbar-dropdown label="Info">
            <b-navbar-item href="#">About</b-navbar-item>
            <b-navbar-item href="#">Contact</b-navbar-item>
          </b-navbar-dropdown>
        </template>

        <!-- USER LOGGED IN -->
        <template slot="end" v-if="user">
          <b-navbar-item tag="div">
            <span>Welcome, {{user.displayName}}</span>
            <div class="buttons">
              <a class="button is-light" @click="handleLogout()">Log Out</a>
            </div>
          </b-navbar-item>
        </template>

        <!-- USER NOT LOGGED IN -->
        <template slot="end" v-else>
          <b-navbar-item tag="div">
            <div class="buttons">
              <a class="button is-light">Log In</a>
            </div>
          </b-navbar-item>
        </template>

      </b-navbar>

      <div class="notification">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  components: {},
  mounted: function() {
    this.$store.dispatch("user/checkUserStatus");
  },
  methods: mapActions("user", ["handleLogout"]),
  computed: mapGetters({
    user: "user/getData"
  })
};
</script>
