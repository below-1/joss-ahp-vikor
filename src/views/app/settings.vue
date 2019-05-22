<template>
  <div style="width: 100%;">
    <v-toolbar flat>
      <v-toolbar-title>
        Pengaturan
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="saveDataToLocalStorage" flat dark color="amber darken-4">Save</v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-layout row>
        <v-flex md6>
          <v-card flat>
            <v-card-title>
              Basic Settings
            </v-card-title>
            <v-card-text>
              <v-textarea label="Deskripsi Utama" v-model="mainDescription"/>
              <v-text-field label="Deskripsi Singkat" v-model="secondaryDescription"/>
              <v-text-field label="Title 1" v-model="mainTitle"/>
              <v-text-field label="Subtitle" v-model="subtitle"/>
              <v-text-field label="Title Parallax" v-model="parallaxTitle"/>
              <v-text-field label="IR" v-model.number="IR" type="number" :min="0" :step="0.01"/>
              <v-text-field label="v" v-model.number="v" type="number" :min="0" :step="0.01"/>
            </v-card-text>
          </v-card>

          <v-card flat class="my-4">
            <v-card-title>
              Benefit and Cost
            </v-card-title>
            <v-card-text>
              <v-list dense>
                <template v-for="(cname, idx) in colNames">
                  <v-list-tile :key="cname">
                    <v-list-tile-title>{{cname}}</v-list-tile-title>
                    <v-list-tile-action>
                      <v-switch
                        v-model="benefitCols[idx]"
                      ></v-switch>
                    </v-list-tile-action>
                    <v-list-tile-action-text>
                      <v-chip v-if="benefitCols[idx]" color="blue" text-color="white">Benefit</v-chip>
                      <v-chip v-else color="amber darken-4" text-color="white">Cost</v-chip>
                    </v-list-tile-action-text>
                  </v-list-tile>
                  <v-divider :key="`divider-benefitcols-${idx}`"></v-divider>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex md10>
          <v-card flat class="my-2">
            <v-card-title>
              Matrix Perbandingan
            </v-card-title>
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
    </v-container>
  </div>
</template>

<script>
import settings from '@/model/setting'

const PREFIX = 'frninda.settings'
const DEF_RATIO_MATRIX = [
  [1.00, 2.00, 3.00, 5.00, 7.00, 7.00],
  [0.50, 1.00, 3.00, 5.00, 7.00, 7.00],
  [0.33, 0.33, 1.00, 4.00, 5.00, 3.00],
  [0.2, 0.2, 0.25, 1.0, 3.0, 3.0],
  [0.14, 0.14, 0.20, 0.33, 1.0, 2.0],
  [0.14, 0.14, 0.33, 0.33, 0.5, 1.0]
]

export default {
  name: 'setting',
  data () {
    return {
      IR: 1.24,
      v: 0.5,
      benefitCols: [true, true, true, true, true, true],
      colNames: [
        'Pusat Keramaian',
        'Jumlah Pesaing',
        'Akses Jalan',
        'Kebersihan Lokasi Usaha',
        'Zona Parkir',
        'Usaha Pendukung'
      ],
      shortColNames: [ 'PK', 'JP', 'AJ', 'KLU', 'ZP', 'UP' ],
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
      selectedRatioIdx: 0,
      ratioMatrix: DEF_RATIO_MATRIX,
      mainDescription: '',
      secondaryDescription: '',
      mainTitle: '',
      subtitle: '',
      parallaxTitle: ''
    }
  },
  methods: {
    loadDataFromLocalStorage () {
      this.mainDescription = settings.mainDescription()
      this.secondaryDescription = settings.secondaryDescription()
      this.mainTitle = settings.mainTitle()
      this.subtitle = settings.subtitle()
      this.parallaxTitle = settings.parallaxTitle()
      // Get from localStorage
      let rawIR = localStorage.getItem(`${PREFIX}.IR`)
      if (!rawIR) {
        rawIR = '1.24'
      }

      let rawV = localStorage.getItem(`${PREFIX}.v`)
      if (!rawV) {
        rawV = '0.5'
      }

      let rawN = localStorage.getItem(`${PREFIX}.n`)
      if (!rawN) {
        rawN = '6'
      }

      let rawBenCols = localStorage.getItem(`${PREFIX}.benefitCols`)
      if (!rawBenCols) {
        rawBenCols = JSON.stringify([true, true, true, true, true, true])
      }

      let rawRatioMatrix = localStorage.getItem(`${PREFIX}.ratioMatrix`)
      if (!rawRatioMatrix) {
        rawRatioMatrix = JSON.stringify(DEF_RATIO_MATRIX)
      }

      const IR = parseFloat(rawIR)
      const v = parseFloat(rawV)
      const n = parseFloat(rawN)
      const benefitCols = JSON.parse(rawBenCols)
      const ratioMatrix = JSON.parse(rawRatioMatrix)

      this.IR = IR
      this.v = v
      this.n = n
      this.benefitCols = benefitCols
      this.ratioMatrix = ratioMatrix
    },
    saveDataToLocalStorage () {
      localStorage.setItem(`${PREFIX}.IR`, this.IR)
      localStorage.setItem(`${PREFIX}.v`, this.v)
      localStorage.setItem(`${PREFIX}.benefitCols`, JSON.stringify(this.benefitCols))
      localStorage.setItem(`${PREFIX}.ratioMatrix`, JSON.stringify(this.ratioMatrix))
      settings.setMainDescription(this.mainDescription)
      settings.setSecondaryDescription(this.secondaryDescription)
      settings.setMainTitle(this.mainTitle)
      settings.setSubtitle(this.subtitle)
      settings.setParallaxTitle(this.parallaxTitle)
    }
  },
  mounted () {
    this.loadDataFromLocalStorage()
  }
}
</script>

<style>

</style>
