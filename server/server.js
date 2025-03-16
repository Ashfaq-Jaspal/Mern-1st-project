import cors from 'cors';
import express from 'express';
const app = express();
import router from './routes/index.js';
import { PORT } from './config/index.js';
import cookieParser from 'cookie-parser';

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET, PUT, POST, DELETE',
    credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Base Route
app.use('/', router);

// Listener
app.listen(PORT, "0.0.0.0", () => {
    console.log(`server is running on port ${PORT}`);
});
