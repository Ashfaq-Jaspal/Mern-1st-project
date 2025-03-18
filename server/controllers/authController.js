import User from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt-token.js';
import Project from '../models/project-model.js';

// Login
const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        // Check email
        const user = await User.findOne({ email }).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate token
        const token = await generateToken({ name: user.name, id: user._id.toString(), isAdmin: user.isAdmin });
        // Store token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        if (user.isAdmin) {
            const employees = await User.find({ isAdmin: 'false' }).select('_id name');
            const projects = await Project.find();
            res.status(200).json({ message: 'You logged in successfully', user, employees, projects });
        }
        const projects = await Project.find({employees: {$in: user._id}})
        res.status(200).json({  message: 'You logged in successfully', user, projects });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Logout
const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "None", // Required for cross-origin cookies
            path: "/", // Ensure it clears across the entire site
        });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { login, logout };
