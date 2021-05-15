import { JWT } from "@/helpers/jwt.helper";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: <JWT>{},
    isLogin: false,
  },
  mutations: {},
  actions: {},
  modules: {},
});
