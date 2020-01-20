const mongoose = require('mongoose');
const Electronic = require('./');

const models = {
  getAll: () => {
    return Electronic.find({}).sort({createdAt: 'desc'})
  },

  post: (electronic) => {
    return Electronic.create(electronic)
  },

  getOne: (id) => {
    return Electronic.findById(id)
  },

  put: (id, edits) => {
    return Electronic.findByIdAndUpdate(id, edits)
  },

  delete: (id) => {
    return Electronic.findByIdAndDelete(id)
  }
}

module.exports = models