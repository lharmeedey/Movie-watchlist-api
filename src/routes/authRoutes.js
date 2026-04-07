const express = require('express');
const router = express.Router();
const {register, login, logout} = require('../controller/authController');
const validateRequest = require('../middleware/validateRequest');
const { registerSchema, loginSchema } = require('../validators/authValidators');


router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/logout', logout)


module.exports = router;