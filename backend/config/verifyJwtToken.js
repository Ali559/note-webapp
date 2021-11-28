module.exports = function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
		return;
	} else {
		return res.status(403).json({ message: 'Forbidden Route' });
	}
};
