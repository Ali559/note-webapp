const { model, Schema } = require('mongoose');
const NoteSchema = new Schema({
	_userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
	title: {
		type: String,
		required: true,
		unique: true
	},
	category: {
		type: String,
		required: true
	},
	tags: {
		type: Array,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true
	},
	photo: {
		type: String,
		required: true
	},
	note: {
		type: String,
		required: true
	}
});

module.exports = model('Notes', NoteSchema);
