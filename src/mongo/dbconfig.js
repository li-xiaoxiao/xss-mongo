
const mongoose = require('mongoose'),
DB_URL = 'mongodb://localhost:27017/demo'
const db = mongoose.connect(DB_URL)

mongoose.connection.on('connected', function () {
  console.log("connection success " + DB_URL)
})

mongoose.connection.on('error', function (err) {
  console.log("connection error " + err)
})

mongoose.connection.on('disconnected', function () {
  console.log("disconnected")
})
const schema = new mongoose.Schema({
  name: String,
  time: String,
  comment: String
})
const demo = mongoose.model('demo', schema, 'demo');

module.exports = demo
