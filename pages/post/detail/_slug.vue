<template>
  <!--
    Render website post page
  -->
  <div class="container">
    <post-content :data="post" />

    <template v-if="isLoading === false">
      <related-content :posts="relatedPosts" />
    </template>
  </div>
</template>

<script lang="ts">
// Import
import { Component, Vue } from 'vue-property-decorator'
import { Post } from '@/endpoint'
import PostContent from '@/components/pages/post/PostContentComponent.vue'
import RelatedContent from '@/components/pages/post/RelatedContentComponent.vue'

@Component({
  async asyncData({ error, params, $axios }) {
    const POST = new Post()

    // set request data
    const postData = {
      params: {
        slug: params.slug,
        status: 'publish',
        _embed: true
      }
    }

    const requestPost = await POST.detail(postData, $axios)
  
    // status error
    if (requestPost.status === 'error') {
      error({ statusCode: 404, message: 'Post not found' })
      return
    }

    if (requestPost.data.length > 1) {
      error({ statusCode: 404, message: 'Post not found' })
      return
    }

    const data = {
      post: requestPost.data[0],
      relatedPosts: []
    }

    // set request data
    const relatedPostsData = {
      params: {
        _embed: true,
        per_page: 6,
        categories: data.post.categories,
        exclude: data.post.id,
        status: 'publish'
      }
    }

    // make request
    const requestRelatedPosts = await POST.list(relatedPostsData, $axios)

    // status error
    if (requestRelatedPosts.status === 'error') {
      error({ statusCode: 404, message: 'Post not found' })
      return
    }

    // add posts
    data.relatedPosts = requestRelatedPosts.data

    return data
  },
  components: {
    PostContent,
    RelatedContent
  }
})
export default class PostDetailPage extends Vue {
  isLoading: boolean = false
  post: object = {}
  relatedPosts: object[] = []

  mounted() {
    this.isLoading = false
  }
}
</script>
