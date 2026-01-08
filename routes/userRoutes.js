const express = require('express');
const router = express.Router();
const { authenticate, validateUser } = require('../middlewares/userMiddleware');
const userController = require('../controllers/userController');

router.use(authenticate);
router.use(validateUser);

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;