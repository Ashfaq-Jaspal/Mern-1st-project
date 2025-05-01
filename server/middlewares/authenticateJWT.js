import jwt from 'jsonwebtoken';
import { ACCESS_SECRET_KEY } from '../config/index.js';

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(403).json({message: 'No token'})
    }
    jwt.verify(token, ACCESS_SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decodedToken;
        next();
    });
};

export default authenticateJWT;
