<template>
  <v-container fluid>
    <v-layout v-if="running === true && done === false" column justify-center align-center fill-height>
      <div class="title py-4">Wait A Minute!</div>
      <v-progress-circular indeterminate :size="128" width="16" color="amber"/>
    </v-layout>
    <v-layout v-if="running === false && done === true">
      <v-flex md12>
        <v-card>
          <v-card-title>
            Table Peringkat
          </v-card-title>
          <v-btn large dark class="py-4" color="amber" @click="$emit('back')">Ulangi</v-btn>
          <v-data-table :headers="headersSorted" :items="sorted" hide-actions :total-items="sorted.length">
            <template v-slot:items="props">
              <tr>
                <td>{{indexSorted[props.index]}}</td>
                <td>{{props.item.C1.toFixed(4)}}</td>
                <td>{{props.item.C2.toFixed(4)}}</td>
                <td>{{props.item.C3.toFixed(4)}}</td>
                <td>{{props.item.C4.toFixed(4)}}</td>
                <td>{{props.item.C5.toFixed(4)}}</td>
                <td>{{props.item.C6.toFixed(4)}}</td>
                <td>{{props.item.S.toFixed(4)}}</td>
                <td>{{props.item.R.toFixed(4)}}</td>
                <td>{{props.item.Q.toFixed(4)}}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <v-card class="my-4">
          <v-card-title>
            Table Kelayakan
          </v-card-title>
          <div class="pa-4 title">Nilai Preferensi: {{pref}}</div>
          <v-data-table :headers="headersSorted" :items="result" hide-actions :total-items="result.length">
            <template v-slot:items="props">
              <tr v-bind:class="{ red: props.item.Q > pref }">
                <td>{{indexResult[props.index]}}</td>
                <td>{{props.item.C1.toFixed(4)}}</td>
                <td>{{props.item.C2.toFixed(4)}}</td>
                <td>{{props.item.C3.toFixed(4)}}</td>
                <td>{{props.item.C4.toFixed(4)}}</td>
                <td>{{props.item.C5.toFixed(4)}}</td>
                <td>{{props.item.C6.toFixed(4)}}</td>
                <td>{{props.item.S.toFixed(4)}}</td>
                <td>{{props.item.R.toFixed(4)}}</td>
                <td>{{props.item.Q.toFixed(4)}}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { rankAPI } from '@/api'

export default {
  data () {
    return {
      running: false,
      done: false,
      indexSorted: [],
      indexResult: [],
      result: [],
      sorted: [],
      headersSorted: [
        {
          text: 'Nama Jalan'
        },
        {
          text: 'C1'
        },
        {
          text: 'C2'
        },
        {
          text: 'C3'
        },
        {
          text: 'C4'
        },
        {
          text: 'C5'
        },
        {
          text: 'C6'
        },
        {
          text: 'S'
        },
        {
          text: 'R'
        },
        {
          text: 'Q'
        }
      ],
      pref: 0
    }
  },
  methods: {
    async doRank () {
      this.running = true
      const result = await this.$db.allDocs({
        include_docs: true,
        attachments: true
      })
      const docs = result.rows.map(row => row.doc)
      const indices = docs.map(doc => doc.name)
      const data = docs.map(doc => {
        return [
          doc.PK,
          doc.JP,
          doc.AJ,
          doc.KLU,
          doc.ZP,
          doc.UP
        ]
      })
      const rankResult = await rankAPI(data, indices)
      this.indexSorted = rankResult.index_sorted
      this.indexResult = rankResult.index_result
      this.result = rankResult.result
      this.sorted = rankResult.sorted

      // Calculate the preferency
      const qn = this.result.map(r => r.Q).reduce((a, b) => a + b, 0)
      const qm = this.sorted.map(r => r.Q).reduce((a, b) => a + b, 0)
      this.pref = (qn - qm) / (this.result.length - this.sorted.length)
      this.running = false
      this.done = true
    }
  },
  mounted () {
    this.doRank()
  }
}
</script>

<style>
tr.red {
  background-color: red;
  color: white;
}
</style>
