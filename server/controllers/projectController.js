import Project from '../models/project-model.js';
import User from '../models/user-model.js';

// Get request for create project page
const getCreateProject = async (req, res) => {
    try {
        const employees = await User.find({ isAdmin: 'false' }).select('_id name status');
        res.status(200).json({ user: req.user, employees });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create project
const postCreateProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, employeeIds } = req.body;

        // Validate project
        const existingProject = await Project.find({ name });
        if (existingProject.length > 0) {
            return res.status(400).json({ message: 'Project name must be unique' });
        }
        // Validate employees
        const employees = await User.find({ _id: { $in: employeeIds } });
        if (employees.length != employeeIds.length) {
            return res.status(400).json({ message: 'Some employees not found' });
        }
        const project = new Project({
            name,
            description,
            startDate,
            endDate,
            employees: employeeIds,
        });
        await project.save();

        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all projects
const allProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        if (projects.length === 0) {
            return res.status(404).json({ message: 'Projects not found', user: req.user });
        }
        res.status(200).json({ projects, user: req.user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all projects of a specific employee
const projectsOfClickedEmployee = async (req, res) => {
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

export { getCreateProject, postCreateProject, allProjects, projectsOfClickedEmployee };
