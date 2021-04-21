<template>
  <div>
    <b-container>
      <b-list-group>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center pointer"
          v-for="(item, index) in items"
          :key="index"
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
        <b-pagination v-model="pageNumber" :total-rows="threadsCount" :per-page="size" v-on:change="getNewPage"></b-pagination>
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
import Vue from 'vue'
import {threadsWithRelations, threadCount} from "@/graphql/thread"
import {Thread} from "@/models/thread.model"

async function getData(page: number, size: number, ctx: any){  
  const result = await threadsWithRelations(page * size - size, size);
  const thread: Thread[] = result;
  ctx.$data.items = thread;
}

export default Vue.extend({
  name: "Threads",
  data: function() {
    return {
      threadsCount: 0,
      pageNumber: 1,
      size: 6,
      items: []
    }
  },
  methods: {
    async getNewPage(page:number){
      await getData(page, this.$data.size, this)
    }
  },
  async mounted() {
    this.$data.threadsCount = await threadCount();
    await getData(this.$data.pageNumber, this.$data.size, this)
  }
})
</script>