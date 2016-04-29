var userController = require('../controllers/contacts');
var router = require('express').Router();

router.route('/contacts')
  .post(userController.create)
  .get(userController.listAll);

router.route('/contacts/:id')
  .get(userController.getById)
  .delete(userController.remove)
  .put(userController.update);

module.exports = router;