<template>
  <div>
    {{ text }}
    {{ fullName }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface User {
  firstName: string
  lastName: number
}

@Component
export default class About extends Vue {
  @Prop({
    type: Object,
    default: () => ({
      firstName: 'Muhaimin',
      lastName: 'Rezki'
    })
  })
  user!: User

  text: string = ''

  mounted() {
    this.text = 'Hi! My name is'
  }

  get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`
  }
}
</script>

<style scoped></style>
