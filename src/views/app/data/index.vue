<template>
  <div id="app-data">
    <v-toolbar flat>
      <v-toolbar-items>
        <v-btn flat>
          Mentah
        </v-btn>
        <v-btn flat>
          Diolah
        </v-btn>
        <v-spacer/>
        <v-btn @click="$router.push('/app/data/add')" flat>Tambah</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'AppData',
  data () {
    return {
      addDialog: false,
      addDialogMaxWidth: 500
    }
  }
}
</script>

<style>

</style>
