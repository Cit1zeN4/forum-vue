<template>
  <div class="container">
    <div v-if="$apollo.queries.thread.loading">Loading...</div>
    <div v-else>
      <div class="row color pt-3">
        <div class="col-10">
          <p class="text-left small-text">{{ $route.params.id }}</p>
          <h3 class="text-left">{{ thread.title }}</h3>
        </div>
        <div class="col-2">
          <div class="float-right">
            <b-icon
              v-b-modal.modal-2
              class="h4 pointer"
              icon="gear-wide-connected"
              aria-hidden="true"
            ></b-icon>
          </div>
        </div>
        <div class="col-12">
          <p class="text-left">{{ thread.description }}</p>
        </div>
      </div>
      <div v-b-toggle.collapse-1 class="row color2" v-if="colapse">
        <div class="col-12">
          <span>Collapse SubThreads</span>
        </div>
      </div>
      <b-collapse id="collapse-1" class="mt-2" v-if="colapse">
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
      <div class="row mt-5">
        <h3 class="col-12">Messages</h3>
        <div class="w-100 d-flex justify-content-end px-3 mb-3">
          <b-button v-b-modal.modal-1 variant="outline-primary">
            Write message
          </b-button>
        </div>
      </div>
      <b-list-group class="w-100 mb-4">
        <b-list-group-item
          class="d-flex justify-content-between align-items-center pointer"
          v-for="item in messages"
          :key="item.id"
        >
          <div>
            <div>
              <!--<h4 class="text-left">{{ item.author.username }}</h4>-->
            </div>
            <div>
              <p class="text-left">
                {{ item.text }}
              </p>
            </div>
            <div>
              <p class="mb-1 text-left">
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
      <b-modal id="modal-2" title="Settings" v-model="showSettingsModal">
        <b-form>
          <h4>Title</h4>
          <b-form-input
            v-model="thread.title"
            placeholder="Enter your name"
          ></b-form-input>
          <h4 class="mt-3">Description</h4>
          <b-form-textarea
            id="textarea"
            v-model="thread.description"
            placeholder="Enter somthing..."
            rows="3"
            max-rows="6"
            class="mt-2"
          ></b-form-textarea>
          <div class="mt-3 p-3 border border-danger rounded">
            <h4>Delete</h4>
            <p>
              If you click this button thread will be deleted. Once clicked this
              action cannot be undone
            </p>
            <div class="d-flex justify-content-end">
              <b-button variant="danger" @click="deleteThread($route.params.id)"
                >Delete</b-button
              >
            </div>
          </div>
        </b-form>
        <template #modal-footer>
          <div class="w-100 d-flex justify-content-center">
            <b-button
              variant="primary"
              size="md"
              @click="showSettingsModal = false"
            >
              Save
            </b-button>
          </div>
        </template>
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
import { getThreadQuery, deleteThreadMutation } from "@/graphql/thread";
import { getThreadMessages, subscribeMessageQuery } from "@/graphql/message";

export default Vue.extend({
  name: "Thread",
  data: function () {
    return {
      thread: {},
      text: "text",
      showSettingsModal: false,
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
    messages: {
      query: getThreadMessages(),
      variables() {
        return {
          getThreadMessagesId: this.$route.params.id,
        };
      },
      subscribeToMore: {
        document: subscribeMessageQuery(),
        updateQuery: (previousResult, { subscriptionData }) => {
          previousResult.getThreadMessages.push(
            subscriptionData.data.newMessage
          );
        },
      },
      update: (data) => data.getThreadMessages,
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
      return new_date.toLocaleString("en-GB");
    },
    async goTo(id: string) {
      this.$data.thread = {};
      this.$router.push({ path: `/thread/${id}` });
    },
    async deleteThread(id: string) {
      const result = await this.$apollo.mutate({
        mutation: deleteThreadMutation(),
        variables: {
          deleteThreadId: id,
        },
      });
      if (result.data?.deleteThread) {
        this.$router.push({ path: `/threads` });
      }
    },
  },
  async mounted() {
    console.log(this.$apollo.queries.thread);
  },
});
</script>
