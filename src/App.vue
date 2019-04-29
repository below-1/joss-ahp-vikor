<template>
  <v-app>
    <v-toolbar app dark flat style="padding-left: 0 !important;">
      <v-toolbar-side-icon>
        <font-awesome-icon class="amber--text text--darken-4" size="2x" :icon="['fab', 'strava']"></font-awesome-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Franchise Rangking</span>
        <span class="font-weight-light">--SALOME</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
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
export default {
  name: 'AppWrapper'
}
</script>

<style>

</style>
