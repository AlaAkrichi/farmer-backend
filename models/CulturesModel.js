import mongoose from 'mongoose';

const culturesSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    surface: { type: String, required: true }, // Surface area (e.g., "12m²")
    datePlantation: { type: Date, required: true }, // Planting date
    recolteEstimee: { type: Date, required: true }, // Estimated harvest date
    progression: { type: Number, required: true, min: 0, max: 100 }, // Progress percentage
    type: { 
        type: String, 
        required: true, 
        enum: ["Légumes", "Fruits", "Herbes"] // Restrict to valid types
    },
    farmer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true // Associate the culture with a specific user
    }
});

const CulturesModel = mongoose.model('Culture', culturesSchema);

export default CulturesModel;