const { model, Schema } = require('mongoose');
const refreshTokenSchema = new Schema({
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: '7d' }
});

module.exports = model('RefreshToken', refreshTokenSchema);
