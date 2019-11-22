<template>
  <!--
    Render website Home page
  -->
  <div class="container">
    <list />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import List from '@/components/pages/home/ListComponent.vue'

@Component({
  async fetch() {
  },
  components: { List }
})
export default class Home extends Vue {
}
</script>
