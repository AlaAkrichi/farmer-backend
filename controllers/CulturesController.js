import CulturesModel from '../models/CulturesModel.js';

// Create a new culture
export const createCulture = async (req, res) => {
    try {
        const { nom, surface, datePlantation, recolteEstimee, progression, type } = req.body;

        // Get the user ID from the authenticated request
        const farmer = req.user.id;

        const newCulture = new CulturesModel({
            nom,
            surface,
            datePlantation,
            recolteEstimee,
            progression,
            type,
            farmer // Associate the culture with the logged-in user
        });

        const savedCulture = await newCulture.save();
        res.status(201).json({ success: true, culture: savedCulture });
    } catch (error) {
        console.error("Error creating culture:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all cultures
export const getAllCultures = async (req, res) => {
    try {
        const cultures = await CulturesModel.find().populate('farmer', '-password');
        res.status(200).json({ success: true, cultures });
    } catch (error) {
        console.error("Error fetching cultures:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single culture by ID
export const getCultureById = async (req, res) => {
    try {
        const { id } = req.params;
        const culture = await CulturesModel.findById(id).populate('farmer', '-password');

        if (!culture) {
            return res.status(404).json({ success: false, message: 'Culture not found' });
        }

        res.status(200).json({ success: true, culture });
    } catch (error) {
        console.error("Error fetching culture:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a culture by ID
export const updateCulture = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedCulture = await CulturesModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedCulture) {
            return res.status(404).json({ success: false, message: 'Culture not found' });
        }

        res.status(200).json({ success: true, culture: updatedCulture });
    } catch (error) {
        console.error("Error updating culture:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a culture by ID
export const deleteCulture = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCulture = await CulturesModel.findByIdAndDelete(id);

        if (!deletedCulture) {
            return res.status(404).json({ success: false, message: 'Culture not found' });
        }

        res.status(200).json({ success: true, message: 'Culture deleted successfully' });
    } catch (error) {
        console.error("Error deleting culture:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};