import ProduitsModel from '../models/ProduitsModel.js';

// Create a new product
export const createProduit = async (req, res) => {
    try {
        const { nom, categorie, stock, unite, prix, status } = req.body;

        // Get the user ID from the authenticated request
        const farmer = req.user.id;

        const newProduit = new ProduitsModel({
            nom,
            categorie,
            stock,
            unite,
            prix,
            status,
            farmer // Associate the product with the logged-in user
        });

        const savedProduit = await newProduit.save();
        res.status(201).json({ success: true, produit: savedProduit });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all products
export const getAllProduits = async (req, res) => {
    try {
        const produits = await ProduitsModel.find().populate('farmer', '-password');
        res.status(200).json({ success: true, produits });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single product by ID
export const getProduitById = async (req, res) => {
    try {
        const { id } = req.params;
        const produit = await ProduitsModel.findById(id).populate('farmer', '-password');

        if (!produit) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, produit });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a product by ID
export const updateProduit = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduit = await ProduitsModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduit) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, produit: updatedProduit });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a product by ID
export const deleteProduit = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduit = await ProduitsModel.findByIdAndDelete(id);

        if (!deletedProduit) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};