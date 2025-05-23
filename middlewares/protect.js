// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming your User model is in '../models/User.js'

// This middleware protects routes by verifying a JWT token
// and attaching the authenticated user's data to the request object (req.user).
exports.protect = async (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            // Replace 'YOUR_JWT_SECRET' with your actual secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'YOUR_JWT_SECRET');

            // Find user by ID from the token payload and attach it to req.user
            // .select('-password') ensures the password hash is not returned
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found.' });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Error in authentication middleware:', error);
            res.status(401).json({ message: 'Not authorized, token failed.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token.' });
    }
};
