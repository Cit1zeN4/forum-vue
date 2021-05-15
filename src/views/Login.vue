<template>
  <div class="mt-5 d-flex justify-content-center">
    <b-card title="Login" class="w-75">
      <b-form @submit="login" class="mt-5">
        <h6 class="text-left">Email</h6>
        <b-form-input v-model="form.email" type="email" required />
        <b-form-invalid-feedback :state="validate.email"
          >Incorrect email</b-form-invalid-feedback
        >
        <h6 class="text-left mt-3">Password</h6>
        <b-form-input v-model="form.password" type="password" required />
        <b-form-invalid-feedback :state="validate.password"
          >Incorrect password</b-form-invalid-feedback
        >
        <b-button class="mt-3" type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import store from "@/store";
import axios from "axios";
import Vue from "vue";
import { jwtStringToObject } from "@/helpers/jwt.helper";
import router from "@/router";

export default Vue.extend({
  name: "Login",
  data: function () {
    return {
      form: {
        email: "",
        password: "",
      },
      validate: {
        email: true,
        password: true,
      },
    };
  },
  methods: {
    async login(event: { preventDefault: () => void }) {
      event.preventDefault();
      try {
        const result = await axios.post(
          "http://localhost:4000/login",
          this.form,
          {
            withCredentials: true,
          }
        );
        store.state.userData = jwtStringToObject(result.data.jwt);
        store.state.isLogin = true;
        router.push("/threads");
      } catch (error) {
        const message: string = error.response.data.error;
        if (message.includes("password")) {
          this.validate.password = false;
          this.validate.email = true;
        }
        if (message.includes("email")) {
          this.validate.email = false;
          this.validate.password = true;
        }
      }
    },
  },
});
</script>

<style>
</style>