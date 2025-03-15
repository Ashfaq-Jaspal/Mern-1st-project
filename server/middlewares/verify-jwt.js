import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/index.js';

const verifyJwt = async (req, res, next) => {
    const token = await req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: 'Please login to continue.' });
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token, Please login again' });
        }
        req.user = { decodedToken, isAuthorized: true };
        next();
    });
};

export default verifyJwt;
