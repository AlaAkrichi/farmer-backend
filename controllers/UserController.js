import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated request
        const { nom, prenom, email, phone, motDePasse, image } = req.body;

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update user fields
        if (nom) user.nom = nom;
        if (prenom) user.prenom = prenom;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (image) user.image = image;

        // If a new password is provided, hash it before saving
        if (motDePasse) {
            const salt = await bcrypt.genSalt(10);
            user.motDePasse = await bcrypt.hash(motDePasse, salt);
        }

        // Save the updated user
        const updatedUser = await user.save();

        // Exclude the password from the response
        const { motDePasse: _, ...userData } = updatedUser._doc;

        res.status(200).json({ success: true, user: userData });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Verify old password
export const verifyOldPassword = async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated request
        const { oldPassword } = req.body;

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare the provided old password with the stored hashed password
        const isMatch = await bcrypt.compare(oldPassword, user.motDePasse);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Old password is incorrect' });
        }

        res.status(200).json({ success: true, message: 'Password verified successfully' });
    } catch (error) {
        console.error("Error verifying old password:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};