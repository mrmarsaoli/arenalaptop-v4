<template>
  <!--
    Render Website listing component on homepage

    used on:
    - components/pages/Home.vue
  -->
  <section class="wrapper container">
    <h2 class="container__title">
      Recent News
    </h2>

    <div class="container__content">
      <template v-if="isFirstLoad">
        <div v-for="index in 6" :key="index" class="card">
          <div class="card__image">
            <div class="card__image__content" />
          </div>
          <div class="card__detail">
            <content-loader
              primary-color="#eee"
              secondary-color="#ddd"
              :height="57"
              class="card__title"
            >
              <rect x="0" y="0" width="300" height="20" />
              <rect x="0" y="34" width="200" height="20" />
            </content-loader>
          </div>
        </div>
      </template>

      <template v-else>
        <div v-for="(item, index) in posts" :key="index" class="card">
          <nuxt-link :to="item.slug">
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
      </template>
    </div>

    <div v-if="showButton" class="container__bottom-wrap">
      <template v-if="isLoading">
        <img
          class="container__bottom-wrap__loader"
          src="@/static/icons/loader.svg"
        >
      </template>
      <template v-else>
        <button
          v-lazy
          class="container__bottom-wrap__button"
          role="button"
          @click="fetchPosts"
        >
          LOAD MORE
        </button>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
// Import
import { Component, Vue } from 'vue-property-decorator'
import { Post } from '@/endpoint'
const POST = new Post()
const { ContentLoader } = require('vue-content-loader')

@Component({
  components: {
    ContentLoader
  },
  directives: {
    lazy: {
      // directive definition
      bind: (el: any, _, vnode: any) => {
        el.io = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting === false) {
            return
          }

          if (vnode.context.page === 2) {
            return
          }

          // fech posts
          vnode.context.fetchPosts()
        }, {})

        el.io.observe(el)
      },

      unbind: (el: any) => {
        el.io.unobserve(el)
      }
    }
  }
})
export default class ListComponent extends Vue {
  isFirstLoad: boolean = true
  isLoading: boolean = false
  posts: any[] = []
  totalPosts: number = 0
  page: number = 1

  get showButton() {
    if (this.isFirstLoad) {
      return false
    }

    if (this.totalPosts === 0) {
      return false
    }

    if (this.totalPosts === this.posts.length) {
      return false
    }

    return true
  }

  created() {
    this.fetchPosts()
  }

  /**
   * Fetch posts
   */
  async fetchPosts() {
    // show loader
    this.isLoading = true

    // set request data
    const data = {
      params: {
        _embed: true,
        per_page: 6,
        page: this.page
      }
    }

    // make request
    const request = await POST.list(data, this.$axios)

    if (this.page === 1) {
      // remove content loader
      this.isFirstLoad = false
    }

    // hide loader
    this.isLoading = false

    // status error
    if (request.status === 'error') {
      this.$log('request error')
      return
    }

    // set total posts
    this.totalPosts = Number(request.headers['x-wp-total'])

    // add posts
    this.posts = this.posts.concat(request.data)
    // set page
    this.page++
  }

  /**
   * Helper to get thumbnails image
   */
  thumbnails(index: number) {
    const image = this.posts[index]._embedded['wp:featuredmedia'][0]
      .media_details.sizes.medium.source_url

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
