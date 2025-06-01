const express = require('express');
const router = express.Router();
const PassengerController = require('../controllers/passengerController');
const authMiddleware = require('../middlewares/auth');

router.get('/passengers', authMiddleware, PassengerController.getAllPassengers);
router.get('/passengers/:id', authMiddleware, PassengerController.getPassengerById);

module.exports = router; 