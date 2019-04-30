<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
    >
      <template v-slot:items="props">
        <tr>
          <td>{{props.item.doc.name}}</td>
          <td>{{props.item.format._pk}}</td>
          <td>{{props.item.format._jp}}</td>
          <td>{{props.item.format._aj}}</td>
          <td>{{props.item.format._klu}}</td>
          <td>{{props.item.format._zp}}</td>
          <td>{{props.item.format._up}}</td>
          <td>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  flat
                  v-on="on"
                  small
                >
                  <v-icon>settings</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-btn @click="onEdit(props.item.doc._id)" small flat>Edit</v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-btn @click="deleteData(props.item.doc._id, props.item.doc._rev)" small flat>Delete</v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { format as _format } from '@/model/drow'
import { bus } from '@/event-bus'

export default {
  name: 'RawData',
  data () {
    return {
      headers: [
        {
          text: 'Nama',
          value: 'name',
          width: '20%'
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
        },
        {
          text: ''
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
        const format = _format(row.doc)
        const item = { ...row, format }
        return item
      })
      this.items = formatted
    },
    async deleteData (id, revId) {
      try {
        await this.$db.remove(id, revId)
      } catch (err) {
        console.log(err)
      }
      this.loadData()
    },
    onEdit (id) {
      bus.$emit('lokasi-edit', id)
    }
  },
  mounted () {
    this.loadData()
    // Reload data when user edit is done.
    bus.$on('lokasi-edit-done', () => {
      this.loadData()
    })
  }
}
</script>

<style>

</style>
