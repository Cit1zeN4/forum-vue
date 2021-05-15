<template>
  <div>
    <div v-if="$apollo.queries.user.loading">Loading...</div>
    <div v-else>
      <div class="row">
        <div class="col-lg-3">
          <b-card class="shadow mx-2">
            <b-img
              fluid
              src="https://picsum.photos/250/250/?image=54"
              alt="Image 1"
              width="120px"
              class="rounded"
            ></b-img>
            <h3 class="mt-3">{{ user.username }}</h3>
            <p class="small-text">{{ this.$router.currentRoute.params.id }}</p>
            <h4>{{ user.email }}</h4>
          </b-card>
        </div>
        <div class="col-lg-9 mt-5 mt-lg-0">
          <h4 class="mb-3">Last threads</h4>
          <div class="row">
            <div
              class="col-12 col-lg-6"
              v-for="item in user.threads"
              :key="item.id"
              @click="goTo(item.id)"
            >
              <thread-item
                class="mx-2 mb-2"
                :title="item.title"
                :description="item.description"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.small-text {
  font-size: 12px;
}
</style>

<script lang="ts">
import Vue from "vue";
import ThreadItem from "@/components/ThreadItem.vue";
import { getUserQuery } from "@/graphql/user";

export default Vue.extend({
  name: "Profile",
  components: {
    ThreadItem,
  },
  apollo: {
    user: {
      query: getUserQuery(),
      variables() {
        return {
          getUserId: this.$router.currentRoute.params.id,
        };
      },
      update: (data) => data.getUser,
    },
  },
  methods: {
    goTo(id: string) {
      this.$router.push({ path: `/thread/${id}` });
    },
  },
});
</script>