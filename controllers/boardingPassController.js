const BoardingPass = require('../models/boardingPass');
const Passenger = require('../models/passenger');
const Flight = require('../models/flight');
const Aircraft = require('../models/aircraft');

const getAllBoardingPasses = async (req, res) => {
    try {
        const boardingPasses = await BoardingPass.findAll({
            include: [
                {
                    model: Passenger,
                    attributes: ['first_name', 'last_name', 'cpf']
                },
                {
                    model: Flight,
                    include: [{
                        model: Aircraft,
                        attributes: ['model']
                    }]
                }
            ]
        });
        res.json(boardingPasses);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar cartões de embarque' });
    }
};

const getBoardingPassById = async (req, res) => {
    try {
        const boardingPass = await BoardingPass.findByPk(req.params.id, {
            include: [
                {
                    model: Passenger,
                    attributes: ['first_name', 'last_name', 'cpf']
                },
                {
                    model: Flight,
                    include: [{
                        model: Aircraft,
                        attributes: ['model']
                    }]
                }
            ]
        });
        
        if (!boardingPass) {
            return res.status(404).json({ message: 'Cartão de embarque não encontrado' });
        }
        
        res.json(boardingPass);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar cartão de embarque' });
    }
};

module.exports = {
    getAllBoardingPasses,
    getBoardingPassById
}; 