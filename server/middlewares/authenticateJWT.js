import jwt from 'jsonwebtoken';
import { ACCESS_SECRET_KEY } from '../config/index.js';

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    // if (!authHeader.startsWith('Bearer ')) {
    //     return res.status(401).json({ message: 'Please login to continue.' });
    // }
    // const token = authHeader.split(' ')[1]
    // jwt.verify(token, ACCESS_SECRET_KEY, (err, decodedToken) => {
    //     if (err) {
    //         return res.status(403).json({ message: 'Invalid token, Please login again' });
    //     }
    //     req.user = decodedToken;
        next();
    // });
};

export default authenticateJWT;
