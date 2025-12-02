require('dotenv').config();
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    // Check for token in headers
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "JWT"
    ) {
        // Verify the token
        const decoded = jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.SECRET_KEY,
            // Callback function after verification
            async function (err, verifyToken) {
                if (err) { // Invalid token
                    return res.status(401).json({ error: "Unauthorized access" });
                }
                req.user = verifyToken; // Attach decoded token data to request object
                next();
            }   
        );
    } else {
        return res.status(401).json({ error: "No token provided" });
    }
}

module.exports = verifyToken;