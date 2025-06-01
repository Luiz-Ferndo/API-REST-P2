const express = require('express');
const router = express.Router();
const FlightController = require('../controllers/flightController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, FlightController.getAllFlights);
router.get('/:id', authMiddleware, FlightController.getFlightById);

module.exports = router; 