import mongoose from 'mongoose';

const animauxSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    type: { 
        type: String, 
        required: true, 
        enum: ["Vache", "Taureau", "Poule", "Coq", "Cochon", "Mouton", "Chèvre", "Canard", "Oie"] // Restrict to valid types
    },
    age: { type: Number, required: true },
    sante: { 
        type: String, 
        required: true, 
        enum: ["Excellent", "Bon", "Moyen", "Mauvais"] // Restrict to valid health options
    },
    poids: { type: Number, required: true },
    dateArrivee: { type: Date, required: true }, // Date of arrival
    farmer:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
});

const AnimauxModel = mongoose.model('Animal', animauxSchema);

export default AnimauxModel;