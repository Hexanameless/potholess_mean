var contactsController = require('../controllers/contacts');
var datasController = require('../controllers/datas');
var router = require('express').Router();

router.route('/contacts')
  .post(contactsController.create)
  .get(contactsController.listAll);

router.route('/contacts/:id')
  .get(contactsController.getById)
  .delete(contactsController.remove)
  .put(contactsController.update);

 router.route('/datas')
  .post(datasController.create)
  .delete(datasController.removeAll)
  .get(datasController.listAll);

module.exports = router;
