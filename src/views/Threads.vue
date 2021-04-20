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
            <div class="text-right">
              <div>
                <span class="d-none d-md-inline">messages</span>
                <b-badge class="ml-2" variant="primary" pill>{{
                  item.messages.length
                }}</b-badge>
              </div>
            </div>
            <div class="text-right">
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
        <b-pagination :total-rows="4" :per-page="10"></b-pagination>
      </div>
    </b-container>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>

<script>
export default {
  name: "Threads",
  data: function () {
    return {
      items: [
        {
          id: 1,
          title: "How to do nothing",
          description: "lorem ooor sssa md ppprs lllas  ss s ",
          messages: [{}, {}, {}, {}],
          subThreads: [{}, {}],
        },
        {
          id: 2,
          title: "How to do bro",
          description: "lorem ooor sssa md ppprs",
          messages: [{}, {}, {}, {}, {}, {}, {}],
          subThreads: [{}, {}, {}],
        },
        {
          id: 2,
          title: "How to do bro",
          description: "lorem ooor sssa md ppprs",
          messages: [{}, {}, {}, {}, {}, {}, {}],
          subThreads: [{}, {}, {}],
        },
        {
          id: 2,
          title: "How to do bro",
          description: "lorem ooor sssa md ppprs",
          messages: [{}, {}, {}, {}, {}, {}, {}],
          subThreads: [{}, {}, {}],
        },
        {
          id: 2,
          title: "How to do bro",
          description: "lorem ooor sssa md ppprs",
          messages: [{}, {}, {}, {}, {}, {}, {}],
          subThreads: [{}, {}, {}],
        },
        {
          id: 2,
          title: "How to do bro",
          description: "lorem ooor sssa md ppprs",
          messages: [{}, {}, {}, {}, {}, {}, {}],
          subThreads: [{}, {}, {}],
        },
      ],
    };
  },
};
</script>
