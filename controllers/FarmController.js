import farmModel from '../models/farmModel.js';
import fs from 'fs';
import path from 'path';

// Create a new farm
export const createFarm = async (req, res) => {
    try {
        const { nomFarm, adresse, codePostal, Ville, Superficie, farmer } = req.body;

        // Handle uploaded pictures
        const pictures = req.files ? req.files.map(file => file.path) : [];

        const newFarm = new farmModel({
            nomFarm,
            adresse,
            codePostal,
            Ville,
            Superficie,
            farmer,
            pictures
        });

        const savedFarm = await newFarm.save();
        res.status(201).json({ success: true, farm: savedFarm });
    } catch (error) {
        console.error("Error creating farm:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all farms
export const getAllFarms = async (req, res) => {
    try {
        const farms = await farmModel.find().populate('farmer', '-password');
        res.status(200).json({ success: true, farms });
    } catch (error) {
        console.error("Error fetching farms:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single farm by ID
export const getFarmById = async (req, res) => {
    try {
        const { id } = req.params;
        const farm = await farmModel.findById(id).populate('farmer', '-password');

        if (!farm) {
            return res.status(404).json({ success: false, message: 'Farm not found' });
        }

        res.status(200).json({ success: true, farm });
    } catch (error) {
        console.error("Error fetching farm:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a farm by ID
export const updateFarm = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the existing farm
        const existingFarm = await farmModel.findById(id);
        if (!existingFarm) {
            return res.status(404).json({ success: false, message: 'Farm not found' });
        }

        // Handle uploaded pictures
        const newPictures = req.files ? req.files.map(file => file.path) : [];
        const updatedPictures = [...existingFarm.pictures, ...newPictures];

        // Update the farm
        const updatedFarm = await farmModel.findByIdAndUpdate(
            id,
            { ...req.body, pictures: updatedPictures },
            { new: true }
        );

        res.status(200).json({ success: true, farm: updatedFarm });
    } catch (error) {
        console.error("Error updating farm:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a farm by ID
export const deleteFarm = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the farm to delete
        const farmToDelete = await farmModel.findById(id);
        if (!farmToDelete) {
            return res.status(404).json({ success: false, message: 'Farm not found' });
        }

        // Delete associated pictures from the filesystem
        farmToDelete.pictures.forEach(picture => {
            const filePath = path.resolve(picture);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });

        // Delete the farm from the database
        await farmModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Farm deleted successfully' });
    } catch (error) {
        console.error("Error deleting farm:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};