import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import authRouter from './modules/auth-module/auth.router';

dotenv.config();

const app = express();

// connect mongo
const { MONGO_HOST, MONGO_PORT, MONGO_DB_NAME } = process.env;
mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`);

app.use(express.json());

app.use('/api/v1/auth', authRouter);

const port = process.env.SERVER_PORT || 3000;
app.listen(port);
