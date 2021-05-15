<template>
  <div id="app">
    <div class="mb-3">
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand to="/">Forum3</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/threads">Threads</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav v-if="!isLogin" class="ml-auto">
            <b-nav-item to="/login">Login</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav v-else class="ml-auto">
            <b-nav-item :to="`/profile/${this.$store.state.userData.userId}`"
              >Profile</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script lang="ts">
import Vue from "vue";
import { getCookie, jwtStringToObject } from "@/helpers/jwt.helper";
import { mapState } from "vuex";
import store from "./store";

export default Vue.extend({
  computed: {
    ...mapState({
      isLogin: "isLogin",
    }),
  },
  mounted() {
    const jwt = getCookie("jwt");
    if (jwt) {
      store.state.userData = jwtStringToObject(jwt);
      store.state.isLogin = true;
    }
  },
});
</script>