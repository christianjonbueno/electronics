const mongoose = require('mongoose');
const electronicsSchema = require('./schema.js');

// mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/products')
  .then(() => {
    console.log('Connected to mongoDB');
  })
  .catch((err) => {
    console.error(err);
  })

var Electronic = mongoose.model('Electronic', electronicsSchema);

module.exports = Electronic;