import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import path from 'path'

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            // Exclude the password before sending back user data
            const { password, ...userData } = user._doc;

            return res.status(200).json({
                success: true,
                token,
                user: userData
            });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
    
    export const register = async (req, res) => {
        try {
            const { nom,prenom, email, motDePasse,phone } = req.body;
    
            // Check if the user already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'User already exists' });
            }
    
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(motDePasse, salt);
    
            // Set default avatar
            const defaultAvatar = path.join('uploads', 'default-avatar.png');
    
            // Create a new user
            const newUser = new userModel({
                nom,
                prenom,
                phone,
                email,
                motDePasse: hashedPassword,
                avatar: defaultAvatar // Add default avatar
            });
            // Save the user to the database
            await newUser.save();
    
            // Generate a token
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
            // Exclude the password before sending back user data
            const { password: _, ...userData } = newUser._doc;
    
            return res.status(201).json({
                success: true,
                token,
                user: userData
            });
        } catch (error) {
            console.error("Registration error:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };