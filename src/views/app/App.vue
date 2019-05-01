<template>
  <div id="main-app">
    <v-navigation-drawer
      app
      fixed
      clipped
    >
      <div id="brand">
        <v-layout column justify-center align-center class="py-4 ma-4 grey lighten-4">
          <font-awesome-icon class="amber--text text--darken-4" size="3x" :icon="['fab', 'strava']"></font-awesome-icon>
          <div class="title my-2">
            JOSS-KUPANG
          </div>
          <div class="subtitle font-weight-thin">Applikasi Admin Joss Salome Kupang</div>
        </v-layout>
      </div>
      <v-list class="pl-4">
        <v-list-tile v-for="mitem in menuItems" :key="`menu-item-${mitem.name}`" :to="mitem.to">
          <v-list-tile-action>
            <v-icon :color="mitem.color">{{mitem.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{mitem.name}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MainApp',
  data () {
    return {
      menuItems: [
        {
          name: 'Data',
          icon: 'dashboard',
          to: '/app/data/raw',
          color: 'red accent-2'
        },
        {
          name: 'Setting',
          icon: 'extension',
          to: '/app/settings',
          color: 'blue lighten-2'
        },
        {
          name: 'Ranking',
          icon: 'list',
          to: '/app/rank',
          color: 'teal'
        },
        {
          name: 'Testing',
          icon: 'play_for_work',
          to: '/app/testing',
          color: 'cyan darken-2'
        }
      ]
    }
  }
}
</script>

<style>
#main-app {
  height: 100%;
}
</style>
