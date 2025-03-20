import Project from '../models/project-model.js';
import User from '../models/user-model.js'

// Get all employees of a specific project
export const clickedProject = async (req, res) => {
    try {
        const {projectId} = req.params
        const project = await Project.find({_id: projectId})
        const employeesIds = project[0].employees;
        const employees = await User.find({_id: {$in: employeesIds}})
        res.status(200).json({ project, employees, user: req.user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
