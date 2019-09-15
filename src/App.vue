<template>
  <div id="app">
    <div class="container">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img
              src="https://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_large.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
            />
          </b-navbar-item>
        </template>
        <template slot="start">
          <b-navbar-item tag="router-link" to="/homepage" type="is-link">Homepage</b-navbar-item>
          <b-navbar-item tag="router-link" to="/leaderboard" type="is-link">Leaderboard</b-navbar-item>
          <b-navbar-item tag="router-link" to="/room/existing" type="is-link">Rooms</b-navbar-item>
          <b-navbar-dropdown label="Info">
            <b-navbar-item href="#">About</b-navbar-item>
            <b-navbar-item href="#">Contact</b-navbar-item>
          </b-navbar-dropdown>
        </template>

        <!-- USER LOGGED IN -->
        <template slot="end" v-if="user && user.email">
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
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <section>
            <strong>Opońskie Zakłady</strong> by
            <a href="https://zaglada.bandcamp.com" target="_blank">Bartosz Brożek</a>. Bawcie się dobrze i nie stękajcie za bardzo, bo to jest dopiero wersja
            <i>alpha</i>.

            </section>
            <section>

            <span>
              Source Code:
              <a
                href="https://github.com/bartoszbrozek/soccer-bet"
                target="_blank"
              >GitHub</a>
            </span>
            </section>

          </p>
        </div>
      </footer>
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
