import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export { PORT, DB_CONNECTION_STRING, JWT_SECRET_KEY };
