<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
    >
      <template v-slot:items="props">
        <tr>
          <td>{{props.item.nama}}</td>
          <td>{{props.item.format._pk}}</td>
          <td>{{props.item.format._jp}}</td>
          <td>{{props.item.format._aj}}</td>
          <td>{{props.item.format._klu}}</td>
          <td>{{props.item.format._zp}}</td>
          <td>{{props.item.format._up}}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { format as _format } from '@/model/drow'

export default {
  name: 'RawData',
  data () {
    return {
      headers: [
        {
          text: 'Nama',
          value: 'nama',
          width: '50%'
        },
        {
          text: 'PK',
          value: 'format._pk'
        },
        {
          text: 'JP',
          value: 'format._jp'
        },
        {
          text: 'AJ',
          value: 'format._aj'
        },
        {
          text: 'KLU',
          value: 'format._klu'
        },
        {
          text: 'ZP',
          value: 'format._zp'
        },
        {
          text: 'UP',
          value: 'format._up'
        }
      ],
      items: []
    }
  },
  methods: {
    async loadData () {
      const result = await this.$db.allDocs({
        include_docs: true,
        attachments: true
      })
      const rows = result.rows
      const formatted = rows.map(row => {
        const format = _format(row)
        const item = { ...row, format }
        return item
      })
      this.items = formatted
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style>

</style>
