const multer = require('multer');
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/');
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});
const fileFilter = (req, file, cb) => {
	const mimetypes = [ 'image/jpeg', 'image/png', 'image/webp', 'image/jpg' ];
	if (!mimetypes.includes(file.mimetype)) {
		const err = new Error('Only jpeg, png, jpg and jpeg image file types are accepted');
		cb(err.message, false);
		return;
	}
	cb(null, true);
};

const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 10
	},
	fileFilter
});
module.exports = {
	upload
};
