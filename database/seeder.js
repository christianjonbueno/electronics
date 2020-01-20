const mongoose = require('mongoose');
const Electronic = require('./');
const sampleData = require('./electronics.json');

var seeder = (electronics) => {

  Electronic.create(sampleData)
    .then(() => {
      console.log('Data was seeded!');
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error(err);
    })

}

seeder();