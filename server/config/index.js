import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ;
const MONGO_URI = process.env.MONGO_URI;
const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL

export { PORT, MONGO_URI, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, FRONTEND_URL };
