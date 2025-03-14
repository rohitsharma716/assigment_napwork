const jwt = require('jsonwebtoken')

const generateToken = (userData) => {
       return jwt.sign(userData,process.env.JWT_SECRET, {expiresIn: '1h'})
};


// jwt auth for posts route 
const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: "Token not found" });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        res.status(401).json({ error: "Invalid token" });
    }
};


module.exports  = { generateToken , jwtAuthMiddleware}