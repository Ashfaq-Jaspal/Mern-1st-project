import User from '../models/user-model.js';
import Project from '../models/project-model.js';

// Home
export const CurrentUser = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const employees = await User.find({ isAdmin: false }).select('name email status');
            const projects = await Project.find();
            return res.status(200).json({ user: req.user, employees, projects });
        }
        const projects = await Project.find({employees: {$in: req.user.id}})
        res.status(200).json({ user: req.user, projects });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
