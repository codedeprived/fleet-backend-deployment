// middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from the Authorization header

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' }); // If no token, deny access

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Attach decoded payload (including driverId) to the request object
        next(); // Continue to the next middleware/route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' }); // Handle invalid token
    }
};

module.exports = authMiddleware;
