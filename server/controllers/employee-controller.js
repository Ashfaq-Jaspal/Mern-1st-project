import Project from '../models/project-model.js';

// employee-dashboard route
const Employee = async (req, res) => {
    try {
        const userId = req.user.decodedToken.id;
        const projects = await Project.find({ employees: { $in: userId } });
        res.status(200).json({ user: req.user, projects });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default Employee;
