<template>
  <v-app>
    <v-toolbar app dark flat style="padding-left: 0 !important;">
      <v-toolbar-side-icon to="/">
        <font-awesome-icon class="amber--text text--darken-4" size="2x" :icon="['fab', 'strava']"></font-awesome-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{mainTitle}}</span>
        <span class="font-weight-light">--{{subtitle}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://web.facebook.com/9999x03"
        target="_blank"
      >
        <font-awesome-icon class="pink--text text--accent-2" size="2x" icon="heart"></font-awesome-icon>
        <span class="mr-2 ml-2">About Me!</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import setting from '@/model/setting'

export default {
  name: 'AppWrapper',
  data () {
    return {
      mainTitle: '',
      subtitle: ''
    }
  },
  mounted () {
    this.mainTitle = setting.mainTitle()
    this.subtitle = setting.subtitle()
  }
}
</script>

<style>

</style>
