import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/connect.js';
import authRoute from './routes/AuthRoutes.js';
import farmRoute from './routes/FarmRoute.js';
import animauxRoute from './routes/AnimauxRoute.js';
import culturesRoute from './routes/CulturesRoute.js'; // Import CulturesRoute
import produitRoute from './routes/ProduitRoute.js'
import authMiddleware from './middlewares/authMiddleware.js';
import userRoute from './routes/UserRoute.js'; // Import UserRoute

const app = express();
const port = process.env.PORT || 4000;

connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/farm', authMiddleware, farmRoute);
app.use('/api/animaux', authMiddleware, animauxRoute);
app.use('/api/cultures', authMiddleware, culturesRoute); // Add CulturesRoute
app.use('/api/produit',authMiddleware, produitRoute);

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});