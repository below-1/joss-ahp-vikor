<template>
  <v-container fluid>
    <v-container>
      <v-layout row>
        <v-flex xs12 md12>
          <ahp v-if="step === 0" @next="step = step + 1" @back="step = 0"></ahp>
          <vikor v-if="step === 1" @back="step = 0"/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import setting from '@/model/setting'
import { ahpAPI } from '@/api'
import Ahp from './process/ahp'
import Vikor from './process/vikor'

export default {
  components: {
    Ahp,
    Vikor
  },
  data () {
    return {
      step: 0,
      running: false,
      done: false,
      IR: 1.24,
      colNames: [
        'Pusat Keramaian',
        'Jumlah Pesaing',
        'Akses Jalan',
        'Kebersihan Lokasi Usaha',
        'Zona Parkir',
        'Usaha Pendukung'
      ],
      matrixHeaders: [
        {
          text: '',
          sortable: false,
          width: '25%'
        },
        {
          text: 'PK',
          sortable: false
        },
        {
          text: 'JP',
          sortable: false
        },
        {
          text: 'AJ',
          sortable: false
        },
        {
          text: 'KLU',
          sortable: false
        },
        {
          text: 'ZP',
          sortable: false
        },
        {
          text: 'UP',
          sortable: false
        }
      ],
      ratioMatrix: [],
      shortColNames: [ 'PK', 'JP', 'AJ', 'KLU', 'ZP', 'UP' ],
      pref: 0
    }
  },
  methods: {
    async doRank () {
      this.running = true
      const criteria_mat = setting.ratioMatrix()
      const IR = setting.IR()
      const result = await ahpAPI({ criteria_mat, IR })
      console.log(result)
      this.running = false
      this.done = true
    }
  },
  mounted () {
    this.ratioMatrix = setting.ratioMatrix()
  }
}
</script>

<style>
tr.red {
  background-color: red;
  color: white;
}
</style>
