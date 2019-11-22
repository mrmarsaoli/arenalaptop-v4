<template>
  <!--
    Render Website listing component on homepage

    used on:
    - components/pages/Home.vue
  -->
  <section class="wrapper container">
    <h2 class="container__title">
      Related News
    </h2>

    <div class="container__content">
      <div v-for="(item, index) in posts" :key="index" class="card">
        <nuxt-link
          :to="{ name: 'post:detail', params: { slug: item.slug } }"
        >
          <div class="card__image">
            <div
              v-if="item._embedded['wp:featuredmedia']"
              class="card__image__content"
              :style="{ backgroundImage: `url(${thumbnails(index)})` }"
            />
          </div>
          <div class="card__detail">
            <h3 class="card__title">
              {{ item.title.rendered }}
            </h3>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// Import
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RelatedContentComponent extends Vue {
  @Prop({ type: Array, default: () => [] }) posts!: any[]

  /**
   * Helper to get thumbnails image
   */
  thumbnails(index: number) {
    const image = this.posts[index]._embedded['wp:featuredmedia'][0]
      .source_url

    return image
  }
}
</script>

<style lang="scss" scoped>
.container {
  @apply p-5;

  &__title {
    @apply mt-0 mb-5 text-xl;
  }

  &__content {
    @apply flex flex-wrap;
  }

  &__bottom-wrap {
    @apply flex mt-5 mb-5 justify-center;

    &__loader {
      height: 53px;
    }

    &__button {
      @apply font-semibold text-white text-center bg-secondary max-w-full;
      width: 300px;
    }
  }
}

.card {
  @apply mb-6 ml-6 cursor-pointer shadow-lg;
  width: calc(100% / 3 - 25px + 25px / 3);

  &:nth-child(3n + 1) {
    @apply mb-6 ml-0;
  }

  &__image {
    @apply relative;
    padding: 63% 0 0;

    &__content {
      @apply absolute top-0 left-0 w-full h-full bg-cover
        bg-center bg-no-repeat bg-gray-300;
    }
  }

  &__detail {
    @apply bg-white py-3 px-4;
  }

  &__title {
    @apply m-0 text-base text-gray-800;
  }

  @media (max-width: 768px) {
    width: calc(100% / 2 - 25px + 25px / 2);

    &:nth-child(3n + 1) {
      @apply mt-0 mr-0 mb-6 ml-6;
    }

    &:nth-child(2n + 1) {
      @apply mt-0 mr-0 mb-6 ml-0;
    }
  }

  @media (max-width: 600px) {
    @apply mt-0 mr-0 mb-6 ml-0 w-full;

    &:nth-child(3n + 1) {
      @apply mt-0 mr-0 mb-6 ml-0;
    }
  }
}
</style>
