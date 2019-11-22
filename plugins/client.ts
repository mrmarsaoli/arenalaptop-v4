import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $log(message: any): void
  }
}

Vue.prototype.$log = (message: any) => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  console.log(message) // eslint-disable-line
}
