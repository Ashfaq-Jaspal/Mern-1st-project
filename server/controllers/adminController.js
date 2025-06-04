import User from '../models/User.js';
import Project from '../models/Project.js';

// get admin data
export const getAdminData = async (req, res) => {
    try {
        const employees = await User.find({ isAdmin: false }).select('name email status');
        const projects = await Project.find();
        if (!(employees && projects)) {
            return res.status(403).json({ message: 'Data not available' });
        }
        res.status(200).json({ employees, projects });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
