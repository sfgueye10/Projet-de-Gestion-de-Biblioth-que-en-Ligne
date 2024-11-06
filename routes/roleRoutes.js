const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { validateRole } = require('../middlewares/validateRole');

router.get('/roles', roleController.getAllRoles);
router.get('/roles/:id', roleController.getRoleById);
router.post('/roles', validateRole, roleController.createRole);
router.put('/roles/:id', validateRole, roleController.updateRole);
router.delete('/roles/:id', roleController.deleteRole);

module.exports = router;
