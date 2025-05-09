import mongoose from 'mongoose';

const produitsSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    categorie: { 
        type: String, 
        required: true, 
        enum: ["Produit laitier", "Œufs", "Légumes", "Épicerie"] // Restrict to valid categories
    },
    stock: { type: Number, required: true }, // Quantity in stock
    unite: { type: String, required: true }, // Unit of measurement (e.g., "kg", "litre")
    prix: { type: Number, required: true }, // Price per unit
    status: { 
        type: String, 
        required: true, 
        enum: ["En stock", "Stock faible", "Épuisé"] // Restrict to valid statuses
    },
    farmer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true // Associate the product with a specific user
    }
});

const ProduitsModel = mongoose.model('Produit', produitsSchema);

export default ProduitsModel;