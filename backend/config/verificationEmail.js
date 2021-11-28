require('dotenv').config();
const sgMail = require('@sendgrid/mail');
function verifySignupEmail(req, res) {
	const { token } = req;
	const { username, email } = req.body;
	const msg = {
		to: email, // Change to your recipient
		from: 'ali99yasin@gmail.com', // Change to your verified sender
		subject: 'Account Verification',
		text: `Hello ${username},\n\n Please verify your account by clicking the link: \nhttp:\/\/${req.headers
			.host}\/api\/users\/verfiy-email\/${email}\/${token.token}\n\nThank You!\n`
	};

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	sgMail
		.send(msg)
		.then(() => {
			res.status(200).json({
				message:
					'A verification email has been sent to ' +
					email +
					'. It will expire after one hour. If you did not get verification Email click on resend token.'
			});
			return;
		})
		.catch((error) => {
			return res.status(500).json({ message: error });
		});
}

module.exports = { verifySignupEmail };
