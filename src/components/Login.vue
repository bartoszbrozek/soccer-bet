<template>
  <div>
    <b-button v-bind:loading="isLogging" @click="handleLogin()">Login Using Facebook</b-button>
    <div v-if="isLogging" class="login">Loggining you in...</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {};
  },
  mounted: function() {
    this.$store.dispatch("user/checkUserStatus");
  },
  methods: mapActions("user", ["handleLogin"]),
  computed: mapGetters({
    isLogging: "user/isLogging"
  })
};
</script>
