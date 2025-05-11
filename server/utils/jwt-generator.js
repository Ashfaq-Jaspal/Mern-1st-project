import jwt from 'jsonwebtoken';
import { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } from '../config/index.js';

export const generateAccessToken = async (user) => {
    return jwt.sign(user, ACCESS_SECRET_KEY, {expiresIn: '10m'});
};

export const generateRefreshToken = async (user) => {
    return jwt.sign(user, REFRESH_SECRET_KEY, {expiresIn: '7d'});
};
