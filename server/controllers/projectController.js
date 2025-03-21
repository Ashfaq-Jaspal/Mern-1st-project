import Project from '../models/Project.js';
import User from '../models/User.js';

// Create project
export const createProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, employeeIds } = req.body;

        // Validate project
        const existingProject = await Project.find({ name });
        if (existingProject.length > 0) {
            return res.status(409).json({ message: 'Project name must be unique' });
        }
        const project = new Project({
            name,
            description,
            startDate,
            endDate,
            employees: employeeIds,
        });
        await project.save();

        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get data of clicked project
export const getProjectDetails = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.find({ _id: projectId });
        const employeesIds = project[0].employees;
        const employees = await User.find({ _id: { $in: employeesIds } });
        res.status(200).json({ project, employees, user: req.user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
