const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

//Rotas Publicas
router.post('/login', UserController.login);


//Rotas Privadas
router.get('/users', authMiddleware, UserController.getAllUsers);
router.get('/users/:id', authMiddleware, UserController.getUserById);
router.put('/users/:id', authMiddleware, UserController.updateUser);
router.delete('/users/:id', authMiddleware, UserController.deleteUser);
router.post('/users', authMiddleware, UserController.createUser);

module.exports = router;