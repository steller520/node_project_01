require('dotenv').config();
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "JWT"
    ) {
        const decoded = jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.SECRET_KEY,
            async function (err, verifyToken) {
                if (err) {
                    return res.status(401).json({ error: "Unauthorized access" });
                }
                req.user = verifyToken;
                next();
            }   
        );
    } else {
        return res.status(401).json({ error: "No token provided" });
    }
}

module.exports = verifyToken;