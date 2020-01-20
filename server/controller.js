const models = require('../database/models.js');

const controller = {
  get: (req, res) => {
    models.getAll()
      .then((docs) => {
        res.status(200).send(docs);
      })
      .catch((err) => {
        res.status(404).send(err);
      })
  },

  post: (req, res) => {
    models.post(req.body)
      .then(() => {
        res.status(201).send('Posted into database');
      })
      .catch((err) => {
        res.status(404).send(err)
      })
  },

  getOne: (req, res) => {
    models.getOne(req.params.id)
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((err) => {
        res.status(400).send(err);
      })

  },

  put: (req, res) => {
    models.put(req.params.id, req.body)
      .then(() => {
        res.status(201).send('Updated electronic');
      })
      .catch((err) => {
        res.status(400).send(err);
      })
  },

  delete: (req, res) => {
    models.delete(req.params.id)
      .then(() => {
        res.status(200).send('Deleted electronic')
      })
      .catch((err) => {
        res.status(400).send(err);
      })

  },

}

module.exports = controller