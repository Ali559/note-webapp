const express = require('express');
const router = express.Router();
const { validateLogin, validateSignup } = require('../config/validation.js');
const {
	createToken,
	findIfUserExists,
	findToken,
	findOneUser,
	createUser,
	findUserWithToken
} = require('../config/CRUDuser');
const { login, getUser, verifyAccount, refreshToken, logout } = require('../controllers/userController');
const verifyJwtToken = require('../config/verifyJwtToken');
const { verifySignupEmail } = require('../config/verificationEmail');

router.post('/login', validateLogin, findOneUser, login);

router.get('/user', verifyJwtToken, getUser);

router.post('/refresh-token/:token', refreshToken);

router.delete('/logout', verifyJwtToken, logout);

router.post('/signup', validateSignup, findIfUserExists, createUser, createToken, verifySignupEmail);

router.get('/verfiy-email/:email/:token', findToken, findUserWithToken, verifyAccount);

module.exports = router;
