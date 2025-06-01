const express = require('express');
const router = express.Router();
const AircraftController = require('../controllers/aircraftController');
const authMiddleware = require('../middlewares/auth');

//Rotas Publicas
router.get('/aircrafts', authMiddleware, AircraftController.getAllAircrafts);
router.get('/aircrafts/:id', authMiddleware, AircraftController.getAircraftById);
router.get('/aircrafts/model/:model', authMiddleware, AircraftController.getAircraftByModel);
router.get('/aircrafts/manufacturer/:manufacturer', authMiddleware, AircraftController.getAircraftByManufacturer);

module.exports = router; 