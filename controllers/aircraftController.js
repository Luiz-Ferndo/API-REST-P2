const Aircraft = require('../models/aircraft');

const getAllAircrafts = async (req, res) => {
    try {
        const aircrafts = await Aircraft.findAll();
        res.json(aircrafts);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar aeronaves' });
    }
};

const getAircraftById = async (req, res) => {
    try {
        const aircraft = await Aircraft.findByPk(req.params.id);
        
        if (!aircraft) {
            return res.status(404).json({ message: 'Aeronave não encontrada' });
        }
        
        res.json(aircraft);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar aeronave' });
    }
};

const getAircraftByModel = async (req, res) => {
    try {
        const {model} = req.params;
        const aircraft = await Aircraft.findAll({
            where: {
                model: model
            }
        });

        res.json(aircraft);
    } catch (err) {
        res.status(500).json({message: 'Erro ao buscar aeronave por modelo'});
    }
};

const getAircraftByManufacturer = async (req, res) => {
    try {
        const {manufacturer} = req.params;
        const aircraft = await Aircraft.findAll({
            where: {
                manufacturer: manufacturer
            }
        });

        res.json(aircraft);
    } catch (err) {
        res.status(500).json({message: 'Erro ao buscar aeronave por fabricante'});
    }
};

module.exports = {
    getAllAircrafts,
    getAircraftById,
    getAircraftByModel,
    getAircraftByManufacturer
}; 