const Grain = require('../models/grainModel');

const createGrain = async (req, res) => {
    try {
        const grain = new Grain({ ...req.body, userId: req.user.id });
        const savedGrain = await grain.save();
        res.json(savedGrain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGrains = async (req, res) => {
    try {
        const grains = await Grain.find({ userId: req.user.id });
        res.json(grains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGrain = async (req, res) => {
    try {
        const grain = await Grain.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!grain) return res.status(404).json({ message: 'Grain not found' });
        res.json(grain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGrain = async (req, res) => {
    try {
        const result = await Grain.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!result) return res.status(404).json({ message: 'Grain not found' });
        res.json({ message: 'Grain deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createGrain,
    getGrains,
    updateGrain,
    deleteGrain
};
