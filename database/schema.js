const mongoose = require('mongoose');

const electronicsSchema = mongoose.Schema({

  name: {type: String},
  description: {type: String},
  color: {type: String},
  price: {type: Number},
  pictureURL: {type: String},
  createdAt: {type: Date, default: Date.now}

});

module.exports = electronicsSchema