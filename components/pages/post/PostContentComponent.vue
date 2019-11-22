<template>
  <!--
    Render post content on post page

    used on:
    - components/pages/Post.vue
  -->
  <section class="content wrapper">
    <span class="content__breadcrumbs">
      <router-link class="gray light" to="/">Home</router-link> »
      {{ data.title.rendered }}
    </span>
    <div class="content___header">
      <h2>{{ data.title.rendered }}</h2>
    </div>
    <article v-html="data.content.rendered" />
  </section>
</template>

<script lang="ts">
// Import
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PostContentComponent extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: object
}
</script>

<style lang="scss" scoped>
.content {
  &__breadcrumbs {
    @apply font-normal text-sm text-gray-700;
  }

  &__header {
    @apply text-xl;
  }

  article {
    ::v-deep {
      test {
      }

      h2 {
        @apply hidden;
      }

      p {
        @apply my-4;
      }

      img {
        @apply -mx-5 h-auto bg-gray-800;
        width: calc(100% + 2.5rem);
        max-width: none;
      }
    }
  }
}
</style>
