import Project from "../models/project-model";
import User from "../models/user-model";

// Admin Dashboard
const Admin = async (req, res) => {
    try {
        const employees = await User.find({idAdmin: false})
        const numberOfEmployees = employees.length
        const projects = await Project.find()
        const numberOfProjects = projects.length
        res.status(200).json({ user: req.user, numberOfEmployees, numberOfProjects });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default Admin ;