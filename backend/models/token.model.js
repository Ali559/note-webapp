const { model, Schema } = require('mongoose');
const tokenSchema = new Schema({
	_userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: '1h' }
});

module.exports = model('Token', tokenSchema);
