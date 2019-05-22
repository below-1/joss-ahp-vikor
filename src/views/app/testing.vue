<template>
  <v-container fluid fill-height grid-list-md>
    <v-layout v-if="running === false && done === false" column justify-center align-center>
      <v-icon x-large class="my-4">update</v-icon>
      <v-btn
        large
        dark
        color="amber darken-4"
        style="max-width: 300px;"
        @click="doTesting"
      >Jalankan Testing!</v-btn>
    </v-layout>
    <v-layout v-if="running === true && done === false" column justify-center align-center fill-height>
      <div class="title py-4">Wait A Minute!</div>
      <v-progress-circular indeterminate :size="128" width="16" color="amber"/>
    </v-layout>
    <v-layout v-if="running === false && done === true">
      <v-flex md4 v-for="idx in 3" :key="`v_test-${idx}`">
        <v-card class="my-4">
          <v-card-title>
            Table Kelayakan ({{ vs[idx-1] }})
          </v-card-title>
          <v-data-table :headers="headersSorted" :items="testResult[idx - 1].result">
            <template v-slot:items="props">
              <tr>
                <td>{{testResult[idx-1].indices[props.index]}}</td>
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
import settings from '@/model/setting'
import { rankAPI } from '@/api'

export default {
  name: 'Testing',
  data () {
    return {
      running: false,
      done: false,
      testResult: [],
      indexSorted: [],
      indexResult: [],
      result: [],
      sorted: [],
      headersSorted: [
        {
          text: 'Nama Jalan'
        },
        {
          text: 'Q'
        }
      ],
      pref: 0,
      vs: [0.4, 0.5, 0.6]
    }
  },
  methods: {
    async doTesting () {
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
      settings.setV(0.4)
      let rankResult = await rankAPI(data, indices)
      let aResult = rankResult.result
      let aIndexResult = rankResult.index_result
      this.testResult.push({
        indices: aIndexResult,
        result: aResult
      })

      settings.setV(0.5)
      rankResult = await rankAPI(data, indices)
      aResult = rankResult.result
      aIndexResult = rankResult.index_result
      this.testResult.push({
        indices: aIndexResult,
        result: aResult
      })

      settings.setV(0.6)
      rankResult = await rankAPI(data, indices)
      aResult = rankResult.result
      aIndexResult = rankResult.index_result
      this.testResult.push({
        indices: aIndexResult,
        result: aResult
      })
      settings.setV(0.5)
      this.running = false
      this.done = true
    }
  }
}
</script>

<style>
tr.red {
  background-color: red;
  color: white;
}
</style>
