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

// delete project
export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// update project
export const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name, description, startDate, endDate, employeeIds } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(projectId, { name, description, startDate, endDate, employees: employeeIds }, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
