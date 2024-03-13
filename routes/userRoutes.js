const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);

router.get('/users/:id', userController.getUser);

router.get('/users', userController.getAllUsers);

router.patch('/users/:id', userController.updateUser);

router.delete('/users/:id', userController.deleteUser);

module.exports = router;
