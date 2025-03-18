import Project from '../models/project-model.js';
import User from '../models/user-model.js'

// Employee Dashboard
const Employee = async (req, res) => {
    try {
        const userId = req.user.id;
        const projects = await Project.find({ employees: { $in: userId } });
        if (projects.length === 0) {
            return res.status(404).json({user: req.user, message: 'Projects not found'})
        }
        res.status(200).json({ user: req.user, projects});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all employees
const allEmployees = async (req, res) => {
    try {
        const employees = await User.find({isAdmin: false}).select('name email status')
        if (employees.length === 0) {
            return res.status(404).json({message: 'Employees not found', user: req.user})
        }
        res.status(200).json({employees, user: req.user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Get all projects of a specific employee
const clickedProject = async (req, res) => {
    try {
        const {projectId} = req.params
        const project = await Project.find({_id: projectId})
        const employeesArray = project[0].employees;
        const employees = await User.find({_id: {$in: employeesArray}})
        res.status(200).json({ project, employees, user: req.user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export  {Employee, allEmployees, clickedProject};
