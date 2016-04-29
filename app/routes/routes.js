var contactsController = require('../controllers/contacts');
var vibrationsController = require('../controllers/vibrations');
var router = require('express').Router();

router.route('/contacts')
	.post(contactsController.create)
	.get(contactsController.listAll);

router.route('/contacts/:id')
	.get(contactsController.getById)
	.delete(contactsController.remove)
	.put(contactsController.update);

router.route('/vibrations')
	.post(vibrationsController.insertMultiple)
	.delete(vibrationsController.deleteAll)
	.get(vibrationsController.getAllVibrations);

router.route('/vibrations/find')
	.post(vibrationsController.getAllVibrationsFromQuery);

module.exports = router;
