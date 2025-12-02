const { registerUser, loginUser } = require("../controllers/user.controller");
const validate = require("../middleware/validator");
const { registerSchema, loginSchema } = require("../validation/user.validation");


function userRoutes(app) {
    app.post('/register', validate(registerSchema), registerUser);
    app.post('/login', validate(loginSchema), loginUser);
}

module.exports = userRoutes;