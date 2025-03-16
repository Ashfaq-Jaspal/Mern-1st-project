import Project from '../models/project-model.js';
import User from '../models/user-model.js';
import bcrypt from 'bcrypt';

// Get request for create user page
const getCreate = async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create user
const postCreate = async (req, res) => {
    let { name, email, password, status } = req.body;
    try {
        // Check if user already exists
        let userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const userCreated = new User({
            name,
            email,
            password: hashPassword,
            status,
        });
        await userCreated.save()

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {getCreate, postCreate} ;