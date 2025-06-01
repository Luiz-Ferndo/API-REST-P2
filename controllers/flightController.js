const Flight = require('../models/flight');
const Aircraft = require('../models/aircraft');

const getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.findAll({
            include: [{
                model: Aircraft,
                attributes: ['model', 'total_seats']
            }]
        });
        res.json(flights);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar voos' });
    }
};

const getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id, {
            include: [{
                model: Aircraft,
                attributes: ['model', 'total_seats']
            }]
        });
        
        if (!flight) {
            return res.status(404).json({ message: 'Voo não encontrado' });
        }
        
        res.json(flight);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar voo' });
    }
};

module.exports = {
    getAllFlights,
    getFlightById
}; 