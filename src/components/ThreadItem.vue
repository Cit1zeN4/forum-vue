<template>
  <div class="pointer">
    <b-card class="shadow">
      <h4 class="text-left">{{ title }}</h4>
      <h6 class="text-left small-text">{{ description }}</h6>
    </b-card>
  </div>
</template>

<style scoped>
.small-text {
  font-size: 12px;
}
.pointer {
  cursor: pointer;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ThreadItem extends Vue {
  @Prop() private title!: string;
  @Prop() private description!: Date;
}
</script>