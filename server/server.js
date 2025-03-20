import cors from 'cors';
import express from 'express';
const app = express();
import router from './routes/index.js';
import { FRONTEND_URL, PORT } from './config/index.js';
import cookieParser from 'cookie-parser';

const corsOptions = {
    origin: ['https://employee-management-app-sooty.vercel.app', 'http://localhost:5173'], // Allow frontend URL
    credentials: true, // Allow cookies (important for authentication)
    methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow these headers
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Base Route
app.use('/', router);

// Listener
app.listen(PORT, '0.0.0.0', () => {
    console.log(`server is running on port ${PORT}`);
});
