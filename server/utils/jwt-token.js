import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../index.js';

// Generate token method
const generateToken = async (user) => {
    return jwt.sign(user, JWT_SECRET_KEY);
};

export { generateToken };
