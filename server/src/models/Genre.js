const mongoose = require('mongoose')
const Schema = mongoose.Schema

const genreSchema = new Schema({
  name:
      {
        type: String,
        required: true,
        unique: true
      }
})

module.exports = mongoose.model('genres', genreSchema)
