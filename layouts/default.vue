<template>
  <div>
    <site-header />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SiteHeader from '@/components/SiteHeader.vue'

@Component({
  components: {
    SiteHeader
  }
})
export default class Default extends Vue {}
</script>

<style lang="scss">
body {
  font-size: 15px;
  @apply m-0 leading-normal;
}

* {
  box-sizing: border-box;
}

a,
a:visited {
  @apply text-primary font-semibold no-underline;
}

a {
  &.white {
    @apply text-white;
  }

  &.gray {
    @apply text-gray-700;
  }

  &.light {
    @apply font-normal;
  }

  &.bold {
    @apply font-bold;
  }
}

button {
  @apply border-0 py-4 px-8 rounded-lg cursor-pointer outline-none;
}

#app {
  @apply text-gray-800 antialiased;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

.wrapper {
  @apply max-w-full py-4 px-5 m-auto;
  width: 1130px;
}

/**
 * Heading rules
 */
h1 {
  @apply text-3xl;
}

h2 {
  @apply text-3xl;
}

h3 {
  @apply text-2xl;
}

h4 {
  @apply text-xl;
}

/**
 * Circle loader
 */
.circle-loader {
  position: relative;
  overflow: hidden;
  height: 200px;

  &::before,
  &::after {
    position: absolute;
    content: '';
    display: block;
    z-index: 1;
  }

  &::before {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    top: 0;
    left: 0;
  }

  &::after {
    background-image: url(/static/icons/loader.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 100px;
    width: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
