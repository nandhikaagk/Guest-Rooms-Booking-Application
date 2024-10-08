const jwt = require('jsonwebtoken');
const config = require('config');

function authHouseOwner(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.houseOwner = decoded; // Attach decoded user data to the request object
        next(); // Call next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = authHouseOwner;
