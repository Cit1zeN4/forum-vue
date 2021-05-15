<template>
  <div>
    <div v-if="$apollo.queries.threads.loading">Loading...</div>
    <b-container v-else>
      <p>{{ $store.state.userData.userId }}</p>
      <b-list-group>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center pointer"
          v-for="item in threads"
          :key="item.id"
          v-on:click="goTo(item.id)"
        >
          <div class="d-flex justify-content-start w-75">
            <div class="d-none d-md-block">
              <b-img
                fluid
                src="https://picsum.photos/250/250/?image=54"
                alt="Image 1"
                width="70px"
              ></b-img>
            </div>
            <div class="ml-md-4 w-75">
              <h3 class="text-left">{{ item.title }}</h3>
              <div class="text-truncate text-left">
                {{ item.description }}
              </div>
            </div>
          </div>
          <div class="d-flex flex-column justify-content-between">
            <div class="text-right" v-if="item.messages">
              <div>
                <span class="d-none d-md-inline">messages</span>
                <b-badge class="ml-2" variant="primary" pill>{{
                  item.messages.length
                }}</b-badge>
              </div>
            </div>
            <div class="text-right" v-if="item.subThreads">
              <div>
                <span class="d-none d-md-inline">sub-threads</span>
                <b-badge class="ml-2" variant="success" pill>{{
                  item.subThreads.length
                }}</b-badge>
              </div>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
      <div class="d-flex justify-content-center mt-5">
        <b-pagination
          v-model="pageNumber"
          :total-rows="threadCount"
          :per-page="size"
        ></b-pagination>
      </div>
    </b-container>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>

<script lang="ts">
import Vue from "vue";
import {
  mainThreadCount,
  getThreadsQuery,
  subscribeThreadQuery,
} from "@/graphql/thread";
import { saveNewThread } from "@/helpers/thread.helper";

export default Vue.extend({
  name: "Threads",
  data: function () {
    return {
      threadCount: 0,
      pageNumber: 1,
      size: 6,
      items: [],
    };
  },
  apollo: {
    threads: {
      query: getThreadsQuery(),
      variables() {
        const page = this.$data.pageNumber;
        const size = this.$data.size;
        return {
          threadsWithRelationsSkip: page * size - size,
          threadsWithRelationsTake: size,
        };
      },
      subscribeToMore: {
        document: subscribeThreadQuery(),
        updateQuery: (previousResult, { subscriptionData }) => {
          subscriptionData.data.newThread.subThreads = [];
          subscriptionData.data.newThread.messages = [];

          saveNewThread(
            previousResult.threadsWithRelations,
            subscriptionData.data.newThread,
            2
          );
        },
      },
      update: (data) => data.threadsWithRelations,
    },
  },
  methods: {
    goTo(id: string) {
      this.$router.push({ path: `thread/${id}` });
    },
  },
});
</script>
