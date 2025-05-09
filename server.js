import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/connect.js'
import authRoute from './routes/AuthRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoute)

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});