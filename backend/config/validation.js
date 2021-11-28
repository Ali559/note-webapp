const Joi = require('joi');
const { joiPassword } = require('joi-password');
async function validateLogin(req, res, next) {
	const { email, password } = req.body;
	const schema = Joi.object({
		email: Joi.string().email().message('Email must be a valid Address').required(),
		password: joiPassword
			.string()
			.min(8)
			.message(
				'Password must be atleast 8 characters long and contain atleast 2 special characters, an uppercase letter and a number'
			)
			.max(32)
			.minOfSpecialCharacters(2)
			.minOfUppercase(1)
			.minOfNumeric(1)
			.required()
	});
	try {
		const { error } = await schema.validateAsync({ email, password });
		if (error) return res.status(401).json({ message: error.details[0].message });
		next();
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
}
async function validateSignup(req, res, next) {
	const { username, email, password } = req.body;
	const schema = Joi.object({
		username: Joi.string().min(3).max(20).message('Username must be atleast 3 characters long').required(),
		email: Joi.string().email().message('email should be valid address').required(),
		password: joiPassword
			.string()
			.min(8)
			.message(
				'Password must be atleast 8 characters long and contain atleast 2 special characters, an uppercase letter and a number'
			)
			.max(32)
			.minOfSpecialCharacters(2)
			.minOfUppercase(1)
			.minOfNumeric(1)
			.required()
	});
	try {
		const { error } = await schema.validateAsync({ username, email, password });
		if (error) return res.status(401).json({ message: error.details[0].message });
		next();
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
}
async function validateNoteSchema(req, res, next) {
	const { title, category, tags, note } = req.body;
	const schema = Joi.object({
		title: Joi.string()
			.min(3)
			.message('Title must be atleast 3 characters long and must not be more than 20 characters long')
			.required(),
		category: Joi.string().required(),
		tags: Joi.array().min(3).max(3).message('You must atleast select 3 tags').required(),
		note: Joi.string()
			.min(5)
			.max(100)
			.message('The note must be 5 characters long and not more than 100')
			.required()
	});
	try {
		const { error } = await schema.validateAsync({ title, category, tags, note });
		if (error) return res.status(401).json({ message: error.details[0].message });
		next();
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}

module.exports = { validateLogin, validateSignup, validateNoteSchema };
