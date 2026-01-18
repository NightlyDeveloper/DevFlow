import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use('/api/auth/', authRoutes);

connectDB().then(
    () => app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}));



