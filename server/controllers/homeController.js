import User from '../models/user-model.js'
import Project from '../models/project-model.js'

// Home
const CurrentUser = async (req, res) => {
    try {
        const employees = await User.find({isAdmin: 'false'}).select('_id name')
        const projects = await Project.find()
        res.status(200).json({ user: req.user, employees, projects });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Home
// const Home = async (req, res) => {
//     try {
//         res.status(200).json({ user: req.user });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

export {Home, CurrentUser} ;