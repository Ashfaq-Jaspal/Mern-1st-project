const isAdmin = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Access denied, only admin can access' });
    }
    next();
};

export default isAdmin;
