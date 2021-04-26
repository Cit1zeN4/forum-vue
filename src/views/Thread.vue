<template>
  <div class="container">
    <div v-if="$apollo.queries.thread.loading">Loading...</div>
    <div v-else>
      <div class="row color">
        <div class="col-4 pt-3">
          <p class="text-left small-text">{{ $route.params.id }}</p>
          <h3 class="text-left">{{ thread.title }}</h3>
        </div>
        <div class="col-12">
          <p class="text-left">{{ thread.description }}</p>
        </div>
      </div>
      <div v-b-toggle.collapse-1 class="row color2">
        <div class="col-12">
          <span>Collapse SubThreads</span>
        </div>
      </div>
      <b-collapse id="collapse-1" class="mt-2" :visible="colapse">
        <h3>SubThreads</h3>
        <b-list-group class="w-100">
          <b-list-group-item
            class="d-flex justify-content-between align-items-center pointer"
            v-for="item in thread.subThreads"
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
      </b-collapse>
      <div class="row mt-2">
        <h3 class="col-12">Messages</h3>
        <div class="w-100 d-flex justify-content-end px-3 mb-3">
          <b-button v-b-modal.modal-1 variant="outline-primary">
            Write message
          </b-button>
        </div>
      </div>
      <b-list-group class="w-100">
        <b-list-group-item
          class="d-flex justify-content-between align-items-center pointer"
          v-for="item in thread.messages"
          :key="item.id"
        >
          <div>
            <div>
              <h4 class="text-left">{{ item.author.username }}</h4>
            </div>
            <div>
              <p class="text-left">
                {{ item.text }}
              </p>
            </div>
            <div>
              <p class="text-left">
                {{ dateToString(item.date) }}
              </p>
            </div>
          </div>
          <div class="d-flex flex-column justify-content-between">
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
      <b-modal hide-footer id="modal-1" title="New message">
        <b-form>
          <b-form-textarea
            id="textarea"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
            class="mt-2"
          ></b-form-textarea>
          <div class="d-flex justify-content-center mt-3">
            <b-button type="submit" variant="primary">Send</b-button>
          </div>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<style scoped>
.small-text {
  font-size: 12px;
}
.color {
  background-color: #1565c0;
  color: white;
}
.color2 {
  background-color: #2196f3;
  color: white;
}
.pointer {
  cursor: pointer;
}
</style>

<script lang="ts">
import Vue from "vue";
import { getThreadQuery } from "@/graphql/thread";

export default Vue.extend({
  name: "Thread",
  data: function() {
    return {
      thread: {},
      text: "text",
    };
  },
  apollo: {
    thread: {
      query: getThreadQuery(),
      variables() {
        return { threadWithRelationId: this.$route.params.id };
      },
      update: (data) => data.threadWithRelation,
    },
  },
  computed: {
    colapse() {
      if (this.$data.thread.subThreads?.length) return true;
      return false;
    },
  },
  methods: {
    dateToString(date: number) {
      const new_date = new Date(date);
      return (
        `${new_date.getDay()}.${new_date.getMonth()}.${new_date.getFullYear()} : ` +
        `${new_date.getHours()}:${new_date.getMinutes()}`
      );
    },
    async goTo(id: string) {
      this.$data.thread = {};
      this.$router.push({ path: `/thread/${id}` });
      // const result = await threadWithRelations(this.$route.params.id);
      // this.$data.thread = result;
      // console.log("please");
      // const result = await this.$apollo.queries.thread.refetch({
      //   threadWithRelationId: id,
      // });
      // console.log(result);
    },
  },
  async mounted() {
    // const result = await threadWithRelations(this.$route.params.id);
    // this.$data.thread = result;
    console.log(this.$apollo.queries.thread);
  },
});
</script>
