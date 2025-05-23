// middleware/adminAuthMiddleware.js


const isAdmin = (req, res, next) => {
    // Ensure req.user exists (meaning the user is authenticated)
    // and check if the user's role is 'admin'.
    // The 'role' field should be defined in your User model.
    if (req.user && req.user.role) {
        next(); // User is an admin, proceed to the next middleware/route handler
    } else {
        // User is not an admin or not authenticated
        res.status(403).json({ message: 'Access denied: You do not have admin privileges.' });
    }
};


//focus on this
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
    console.log(token)

    if(!token){
        return res.status(400).json("you gotta provide a token")
    }
        try {
            jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
        if (err){
            return res.status(400).json("invalid token")
        }
        req.user = user
        next()
    })
        } catch (error) {
          console.log(error)
          return res.status(500).json("something went wrong")  
        }
    
}


module.exports = {isAdmin, verifyToken}