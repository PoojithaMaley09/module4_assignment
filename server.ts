import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || '';

app.use(express.json());
app.use('/api', userRoutes);

const connectAndStart = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  } catch (err) { 
    console.error(' MongoDB connection error:', err);
    process.exit(1); // Exit the app if MongoDB fails
  }
};

connectAndStart();
