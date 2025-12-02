const { registerUser, loginUser } = require("../controllers/user.controller");
const validate = require("../middleware/validator");
const { registerSchema, loginSchema } = require("../validation/user.validation");

// user routes
function userRoutes(app) {
    // User registration and login
    app.post('/register', validate(registerSchema), registerUser);
    app.post('/login', validate(loginSchema), loginUser);
}

module.exports = userRoutes;