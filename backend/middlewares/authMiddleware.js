const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Access denied. No token provided.');

    try {
        const token = authHeader.replace('Bearer ', '');
        if (!token) return res.status(401).send('Access denied. No token provided.');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(401).send('Invalid token.');
    }
};
