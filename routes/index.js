const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const aircraftRoutes = require('./aircraftRoutes');
const passengerRoutes = require('./passengerRoutes');
const flightRoutes = require('./flightRoutes');
const boardingPassRoutes = require('./boardingPassRoutes');

// Agrupando todas as rotas sob /api
router.use('/api', userRoutes);
router.use('/api', aircraftRoutes);
router.use('/api', passengerRoutes);
router.use('/api', flightRoutes);
router.use('/api', boardingPassRoutes);

module.exports = router; 