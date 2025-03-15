import express from 'express';
const app = express();
import cors from 'cors';
import router from './routes/index.js';
import { PORT } from './config/index.js';
import cookieParser from 'cookie-parser';

// Call middlewares
const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Base Route
app.use('/', router);

// Listener
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
