const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new Schema(
	{
		username: {
			type: String,
			minlength: 3,
			maxlength: 20,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		isVerified: { type: Boolean, default: false },
		password: {
			type: String,
			required: true,
			minlength: 8
		}
	},
	{ timestamps: true }
);

UserSchema.pre('save', function(next) {
	bcrypt
		.hash(this.password, 10)
		.then((hash) => {
			this.password = hash;
			next();
		})
		.catch((err) => console.log(err));
});

UserSchema.methods.comparePasswords = async function(inputPassword) {
	return await bcrypt.compare(inputPassword, this.password);
};

module.exports = model('Users', UserSchema);
