const Genre = require('../models/Genre')
const winston = require('winston')

module.exports = {
  async index (req, res) {
    try {
      const genres = await Genre.find({}).populate({ path: 'photos' })
      res.status(200).send({
        data: genres
      })
    } catch (err) {
      winston.error(err.message, err)
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async show (req, res) {
    try {
      const id = await req.params.id
      const genre = await Genre.findOne({ _id: id })
      if (!genre) {
        return res.status(400).send({
          error: 'The genre with the given ID was not found'
        })
      }
      res.status(200).send({
        data: genre
      })
    } catch (err) {
      winston.error(err.message, err)
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async post (req, res) {
    try {
      const genre = await Genre.create(req.body)
      res.status(201).send({
        data: genre
      })
    } catch (err) {
      winston.error(err.message, err)
      res.status(500).send({
        error: 'This genre already exists'
      })
    }
  },
  async put (req, res) {
    try {
      const id = await req.params.id
      await Genre.findOneAndUpdate({ _id: id }, req.body)
      const updatedGenre = await Genre.findOne({ _id: id })
      res.status(201).send({
        data: updatedGenre
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async destroy (req, res) {
    // TODO : cannot delete if has photo(s)
    try {
      const id = await req.params.id
      await Genre.findOneAndRemove({ _id: id })
      res.status(204).send({
        data: ''
      })
    } catch (err) {
      winston.error(err.message, err)
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  }
}
