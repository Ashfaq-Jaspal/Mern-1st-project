import Project from '../models/project-model.js';
import User from '../models/user-model.js';
import bcrypt from 'bcrypt';

// Create-user get route
const getCreate = async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create-user post route
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

// Get request for all-employees page
const allEmployees = async (req, res) => {
    try {
        const employees = await User.find({isAdmin: false}).select('name email status')
        if (employees.length === 0) {
            return res.status(404).json({message: 'Employees are not found'})
        }
        res.status(200).json({employees, user: req.user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Get request for all-projects assigned to a specific employee
const clickedProject = async (req, res) => {
    try {
        const {projectId} = req.params
        const project = await Project.find({_id: projectId})
        const employeesArray = project[0].employees;
        const employees = await User.find({_id: {$in: employeesArray}})
        // console.log(employees);
        res.status(200).json({ project, employees, user: req.user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export {getCreate, postCreate, allEmployees, clickedProject} ;