<template>
  <v-container fluid>

    <v-layout row>
      <v-flex md12 sm12>
        <v-card flat class="my-2">
          <v-card-text>
            <v-text-field label="IR" v-model.number="IR" type="number" :min="0" :step="0.01"/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row v-if="running === false && done === false">
      <v-flex md12 sm12>
        <v-card flat class="my-2">
          <v-card-text>
            <v-data-table
              :headers="matrixHeaders"
              :items="shortColNames"
              hide-actions
            >
              <template v-slot:items="props">
                <tr>
                  <td>{{props.item}}</td>
                  <td v-for="(n, i) in 6" :key="`${props.item}-cell-${n}`">
                    <v-edit-dialog>
                      <template v-slot:input>
                        <v-text-field v-model="ratioMatrix[props.index][i]" type="number" min="0" step="0.01"></v-text-field>
                      </template>
                      {{ ratioMatrix[props.index][i] }}
                    </v-edit-dialog>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row v-if="running === false && done === true">
      <v-flex md12 sm12>
        <v-card flat class="my-2">
          <v-card-text>
            <v-data-table
              :headers="resultColNames"
              :items="ahpResult.ratioMatrix"
              hide-actions
            >
              <template v-slot:items="props">
                <tr>
                  <td>C{{ props.index + 1 }}</td>
                  <td>
                    {{ props.item.C1 }}
                  </td>
                  <td>
                    {{ props.item.C2 }}
                  </td>
                  <td>
                    {{ props.item.C3 }}
                  </td>
                  <td>
                    {{ props.item.C4 }}
                  </td>
                  <td>
                    {{ props.item.C5 }}
                  </td>
                  <td>
                    {{ props.item.C6 }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center align-center>
      <v-flex md12 sm12 class="text-md-center text-xs-center">
        <v-btn
          v-if="running === false && done === false"
          large
          dark
          color="amber darken-4"
          style="max-width: 300px;"
          @click="checkAhp"
        >Tes Konsistensi</v-btn>
        <div v-if="running === false && done === true">
          <div class="headline">CR: {{ ahpResult.cr }}</div>
        </div>
        <v-btn
          v-if="running === false && done === true && ahpResult.cr < 0.1"
          large
          dark
          color="amber darken-4"
          style="max-width: 300px;"
          @click="$emit('next')"
        >Next</v-btn>
        <v-btn
          v-if="running === false && done === true && ahpResult.cr > 0.1"
          large
          dark
          color="amber darken-4"
          style="max-width: 300px;"
          @click="back"
        >Back</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import setting from '@/model/setting'
import { ahpAPI } from '@/api'

export default {
  data () {
    return {
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
      resultColNames: [ '', 'PK', 'JP', 'AJ', 'KLU', 'ZP', 'UP' ].map(k => ({ text: k, sortable: false })),
      ahpResult: {
        ci: 0,
        cr: 0.6,
        ratioMatrix: []
      },
      pref: 0
    }
  },
  methods: {
    async checkAhp () {
      this.running = true
      let criteria_mat = this.ratioMatrix
      criteria_mat = criteria_mat.map(row => {
        return row.map(el => {
          if ((typeof el) === 'string') {
            return parseFloat(el)
          } else {
            return el
          }
        })
      })
      const IR = setting.IR()
      const result = await ahpAPI({ criteria_mat, IR })
      this.ahpResult.ci = result.ci
      this.ahpResult.cr = result.cr
      this.ahpResult.ratioMatrix = result.ratio_matrix
      this.running = false
      this.done = true
    },
    back () {
      this.running = false
      this.done = false
      this.$emit('back')
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
