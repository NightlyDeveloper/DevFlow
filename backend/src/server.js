import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import activityRoutes from './routes/activityRoutes.js';

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use('/api/auth/', authRoutes);
app.use('/api/activities/', activityRoutes);

connectDB().then(
    () => app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}));



