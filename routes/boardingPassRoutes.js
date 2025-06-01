const express = require('express');
const router = express.Router();
const BoardingPassController = require('../controllers/boardingPassController');
const authMiddleware = require('../middlewares/auth');

//Rotas Publicas
router.get('/boarding-passes', authMiddleware, BoardingPassController.getAllBoardingPasses);
router.get('/boarding-passes/:id', authMiddleware, BoardingPassController.getBoardingPassById);

module.exports = router; 