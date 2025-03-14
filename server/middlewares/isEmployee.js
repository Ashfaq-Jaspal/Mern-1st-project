const isEmployee = async (req, res, next) => {
    if (req.user.decodedToken.isAdmin) {
        return res.status(401).json({message: 'You are not an employee'})
    }
    next()
}
export default isEmployee