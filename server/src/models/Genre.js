const mongoose = require('mongoose')
const Schema = mongoose.Schema

const genreSchema = new Schema({
  name:
      {
        type: String,
        required: true,
        unique: true
      },
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'photos',
      required: false
    }
  ]
})

module.exports = mongoose.model('genres', genreSchema)
