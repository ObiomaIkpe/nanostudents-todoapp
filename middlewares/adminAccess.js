


const isAdmin = async (req, res, next) => {
    
    if (req.user && req.user.role) {
        next(); 
    } else {
        // User is not an admin or not authenticated
        res.status(403).json({ message: 'Access denied: You do not have admin privileges.' });
    }
};