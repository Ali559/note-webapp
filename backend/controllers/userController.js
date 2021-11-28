require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const Users = require('../models/users.model');
const RefreshToken = require('../models/refreshToken.model.js');
function generateAccessToken(user) {
	return sign({ user }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15m' });
}
const controller = {
	login: async (req, res) => {
		const { user } = req;
		const { email, password } = user;
		try {
			if (!user.comparePasswords(password))
				return res.status(401).json({ message: 'Incorrect email or password' });
			if (!user.isVerified)
				return res.status(401).json({ message: `Your Email has not been verified. Please click on resend` });
			const accessToken = generateAccessToken(user);
			const refreshToken = sign({ user }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' });
			await RefreshToken.create({ token: refreshToken });
			res.status(200).json({ accessToken, refreshToken });
		} catch (err) {}
	},
	logout: async (req, res) => {
		const { token } = req.body;
		try {
			await RefreshToken.deleteOne({ token });
			res.status(200).json({ message: 'Removed Refresh Token' });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},
	refreshToken: async (req, res) => {
		const { token } = req.params;
		try {
			if (token === null) return res.sendStatus(401);
			const doesTokenExist = await RefreshToken.exists({ token });
			if (!doesTokenExist) return res.status(403).json({ message: 'This token does not exist' });
			verify(token, process.env.JWT_REFRESH_TOKEN, (err, data) => {
				if (err) return res.status(401).json({ message: err.message });
				const accessToken = generateAccessToken(data.user);
				res.status(200).json({ accessToken });
			});
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	verifyAccount: async (req, res) => {
		const { user } = req;
		if (user.isVerified) {
			return res.status(200).json({ message: 'User has been already verified. Please Login' });
		}
		try {
			await Users.findByIdAndUpdate(user._id, { isVerified: true });
			return res.status(200).json({ message: 'User was Verified Successfully' });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	getUser: (req, res) => {
		verify(req.token, process.env.JWT_ACCESS_TOKEN, async (err, data) => {
			if (err) return res.status(403).json({ message: err.message });
			try {
				console.log(data);
				const user = await Users.findOne({ email: data.user.email });
				if (user) {
					res.status(200).json({
						message: {
							email: user.email,
							id: user.id,
							username: user.username,
							iat: data.iat,
							exp: data.exp
						}
					});
				}
			} catch (error) {
				return res.status(500).json({ message: error.message });
			}
		});
	}
};

module.exports = controller;
