<template>
  <div id="app-data">
    <v-toolbar flat>
      <v-toolbar-items>
        <v-btn flat to="/app/data/raw">
          Mentah
        </v-btn>
        <v-btn flat>
          Diolah
        </v-btn>
        <v-spacer/>
        <v-btn flat to="/app/data/add">Tambah</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view/>
    <lokasi-edit></lokasi-edit>
  </div>
</template>

<script>
import LokasiEdit from './edit'

export default {
  name: 'AppData',
  components: {
    LokasiEdit
  },
  data () {
    return {
      editDialogMaxWidth: 500,
      editDialog: false
    }
  }
}
</script>

<style>

</style>
