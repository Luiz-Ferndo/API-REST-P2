const Passenger = require('../models/passenger');

const getAllPassengers = async (req, res) => {
    try {
        const passengers = await Passenger.findAll();
        res.json(passengers);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar passageiros' });
    }
};

const getPassengerById = async (req, res) => {
    try {
        const passenger = await Passenger.findByPk(req.params.id);
        
        if (!passenger) {
            return res.status(404).json({ message: 'Passageiro não encontrado' });
        }
        
        res.json(passenger);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar passageiro' });
    }
};

module.exports = {
    getAllPassengers,
    getPassengerById
}; 