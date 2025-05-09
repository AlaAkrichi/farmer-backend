import AnimauxModel from '../models/AnimauxModel.js';

// Create a new animal
export const createAnimal = async (req, res) => {
    try {
        const { nom, type, age, sante, poids, dateArrivee } = req.body;

        // Get the user ID from the authenticated request
        const farmer = req.user.id;

        const newAnimal = new AnimauxModel({
            nom,
            type,
            age,
            sante,
            poids,
            dateArrivee,
            farmer // Associate the animal with the logged-in user
        });

        const savedAnimal = await newAnimal.save();
        res.status(201).json({ success: true, animal: savedAnimal });
    } catch (error) {
        console.error("Error creating animal:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all animals
export const getAllAnimals = async (req, res) => {
    try {
        const animals = await AnimauxModel.find();
        res.status(200).json({ success: true, animals });
    } catch (error) {
        console.error("Error fetching animals:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single animal by ID
export const getAnimalById = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await AnimauxModel.findById(id);

        if (!animal) {
            return res.status(404).json({ success: false, message: 'Animal not found' });
        }

        res.status(200).json({ success: true, animal });
    } catch (error) {
        console.error("Error fetching animal:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an animal by ID
export const updateAnimal = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedAnimal = await AnimauxModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAnimal) {
            return res.status(404).json({ success: false, message: 'Animal not found' });
        }

        res.status(200).json({ success: true, animal: updatedAnimal });
    } catch (error) {
        console.error("Error updating animal:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete an animal by ID
export const deleteAnimal = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAnimal = await AnimauxModel.findByIdAndDelete(id);

        if (!deletedAnimal) {
            return res.status(404).json({ success: false, message: 'Animal not found' });
        }

        res.status(200).json({ success: true, message: 'Animal deleted successfully' });
    } catch (error) {
        console.error("Error deleting animal:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};