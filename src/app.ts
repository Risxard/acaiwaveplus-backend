// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { usersRoutes } from './routes/routes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);

export default app;
