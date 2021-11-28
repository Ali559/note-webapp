const { promisify } = require('util');
const fs = require('fs');
const Notes = require('../models/note.model');
const unlinkAsync = promisify(fs.unlink);
const CRUD = {
	deleteImage: async (req, res, next) => {
		const { noteId } = req.params;
		try {
			if (typeof req.file !== 'undefined') {
				const note = await Notes.findOne({ _id: noteId });
				const previousPhoto = note.photo;
				const newPhoto = req.file.path;
				if (previousPhoto !== newPhoto) {
					await unlinkAsync(previousPhoto);
					req.photo = newPhoto;
					next();
				}
				if (previousPhoto === newPhoto) {
					req.photo = newPhoto;
					next();
				}
			}
		} catch (error) {
			next(error.message);
		}
	},
	deleteImageBeforeRecordIsDeleted: async (req, res, next) => {
		const { noteId } = req.params;
		try {
			const note = await Notes.findOne({ _id: noteId });
			if (note) {
				await unlinkAsync(note.photo);
				next();
			}
		} catch (error) {
			next(error.message);
		}
	}
};

module.exports = CRUD;
