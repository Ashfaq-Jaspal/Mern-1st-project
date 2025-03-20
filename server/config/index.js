import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL

export { PORT, MONGO_URI, JWT_SECRET_KEY, FRONTEND_URL };
