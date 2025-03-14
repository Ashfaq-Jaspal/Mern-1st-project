import User from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt-token.js';

// Login route
const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        // Check email
        const user = await User.findOne({ email });
        const userWithOutPassword = await User.findOne({ email }).select('-password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate token
        const token = await generateToken({ name: user.name, id: user._id.toString(), isAdmin: user.isAdmin });
        // Store token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ message: 'You logged in successfully', Token: token, user: userWithOutPassword });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('token'); // Clears auth token
        return res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { login, logout };
