const controller = require('./controller.js');
const router = require('express').Router();

router
  .route('/')
  .get(controller.get)
  .post(controller.post)

router
  .route(`/:id`)
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router