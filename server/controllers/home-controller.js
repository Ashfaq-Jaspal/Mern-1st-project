import User from '../models/user-model.js'
// Home route
const Home = async (req, res) => {
    try {
        const employees = await User.find({isAdmin: 'false'}).select('_id name')
        if (!employees) {
            return res.status(404).json({message: 'Employees not found'})
        }
        res.status(200).json({ user: req.user, employees });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default Home ;