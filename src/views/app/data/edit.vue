<template>
  <div>
    <v-dialog v-model="dialog" :max-width="dialogWidth">
      <v-card flat>
        <v-card-title>Edit Data</v-card-title>
        <v-card-text>
          <v-text-field v-model="item.name" label="Nama Jalan"/>
          <v-select label="Pusat Keramaian" :items="PKOptions" v-model="item.PK">
          </v-select>
          <v-select :items="JPOptions" v-model="item.JP" label="Jumlah Pesaing">
          </v-select>
          <v-select label="Akses Jalan" :items="AJOptions" v-model="item.AJ">
          </v-select>
          <v-select label="Kebersihan Lingkungan Usaha" :items="KLUOptions" v-model="item.KLU">
          </v-select>
          <v-select label="Zona Parkir" :items="ZPOptions" v-model="item.ZP">
          </v-select>
          <v-select label="Usaha Pendukung" :items="UPOptions" v-model="item.UP">
          </v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="amber darken-4" @click="save">Save</v-btn>
          <v-btn flat @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  PKOptions,
  JPOptions,
  AJOptions,
  KLUOptions,
  ZPOptions,
  UPOptions
} from '@/model/util'
import { bus } from '@/event-bus'

export default {
  data () {
    return {
      dialog: false,
      dialogWidth: '500px',
      id: undefined,
      rev: undefined,
      PKOptions,
      JPOptions,
      AJOptions,
      KLUOptions,
      ZPOptions,
      UPOptions,
      stepperContentHeight: '500px',
      item: {
        name: '',
        PK: 1,
        JP: 1,
        AJ: 1,
        KLU: 1,
        ZP: 1,
        UP: 1
      }
    }
  },
  methods: {
    async loadData (id) {
      let doc = await this.$db.get(id)
      this.item.name = doc.name
      this.item.PK = doc.PK
      this.item.AJ = doc.AJ
      this.item.KLU = doc.KLU
      this.item.ZP = doc.ZP
      this.item.UP = doc.UP
      this.id = doc._id
      this.rev = doc._rev
    },
    async save () {
      const payload = {
        _id: this.id,
        _rev: this.rev,
        ...this.item
      }
      await this.$db.put(payload)
      this.dialog = false
      alert('Sukses mengubah data')
      bus.$emit('lokasi-edit-done')
    }
  },
  mounted () {
    bus.$on('lokasi-edit', async (id) => {
      this.dialog = true
      this.loadData(id)
    })
  },
  beforeDestroy () {
    bus.$off('lokasi-edit')
  }
}
</script>

<style>

</style>
