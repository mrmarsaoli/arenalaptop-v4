<template>
  <!--
    Rende site header

    used on:
    - App.vue
  -->
  <header>
    <h1>
      <router-link to="/">
        Arenalaptop
      </router-link>
    </h1>
  </header>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class SiteHeader extends Vue {}
</script>

<style lang="scss" scoped>
header {
  @apply m-0 py-0 pr-4 pl-6 text-white bg-primary;

  h1 {
    @apply block m-0 py-4 text-2xl font-normal leading-none;
    letter-spacing: 0.1em;
  }

  a {
    @apply text-white;
  }
}
</style>
