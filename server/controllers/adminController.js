// Admin Dashboard
const Admin = async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default Admin ;