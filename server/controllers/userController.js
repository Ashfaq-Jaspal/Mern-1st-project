import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Project from '../models/Project.js';

// Create user
export const createUser = async (req, res) => {
    let { name, email, password, status } = req.body;
    try {
        // Check if user already exists
        let userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(409).json({ message: 'User already exists' });
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
        await userCreated.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// get data of clicked employee
export const getUserDetails = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const projects = await Project.find({ employees: employeeId });
        const employee = await User.find({ _id: employeeId });
        if (projects.length === 0) {
            return res.status(404).json({ message: 'Projects not found', user: req.user, employee });
        }
        res.status(200).json({ projects, employee, user: req.user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete user
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
