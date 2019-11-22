import { VuexModule, Module, getModule } from 'vuex-module-decorators'

@Module({
  name: 'posts',
  namespaced: true,
  stateFactory: true
})
class PostsModules extends VuexModule {
  recentPost: any
}

export default getModule(PostsModules)
