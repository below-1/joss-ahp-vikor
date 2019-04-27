import PouchDB from 'pouchdb'

const Db = {}
Db.install = function (Vue, options) {
  const db = new PouchDB('franchise')
  Vue.prototype.$db = db
}

export default Db
