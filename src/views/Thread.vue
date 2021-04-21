<template>
  <div class="container">
    <div class="row color">
      <div class="col-4 pt-3">
        <p class="text-left small-text">{{ $route.params.id }}</p>
        <h3 class="text-left">{{ this.$data.thread.title }}</h3>
      </div>
      <div class="col-12">
        <p class="text-left">{{ this.$data.thread.description }}</p>
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
      <div class="col-12">
        
        <b-form-textarea
          id="textarea"
          v-model="text"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </div>
      <div class="col-12">
        <b-button variant="outline-primary" class="w-100">Send</b-button>
      </div>
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
import { threadWithRelations } from "@/graphql/thread";
import { Thread } from "@/models/thread.model";

export default Vue.extend({
  name: "Thread",
  data: function() {
    return {
      thread: <Thread>{},
      text: "text",
    };
  },
  computed: {
    colapse() {
      if(this.thread.subThreads?.length)
        return true;
      return false;
    }
  },
  methods: {
    async goTo(id: string) {
      this.$data.thread = {};
      this.$router.push({ path: `/thread/${id}` });
      const result = await threadWithRelations(this.$route.params.id);
      this.$data.thread = result;
    },
  },
  async mounted() {
    const result = await threadWithRelations(this.$route.params.id);
    this.$data.thread = result;
  },
});
</script>
