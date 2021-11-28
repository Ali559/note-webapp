const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream'));
const Notes = require('../models/note.model');
const noteController = {
	getAllUserNotes: async (req, res) => {
		const { userId } = req.params;
		try {
			const notes = await Notes.find({ _userId: userId });
			if (notes.length < 1) return res.status(200).json({ message: `You haven't written any notes` });
			res.status(200).json({ notes });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	postNotes: async (req, res) => {
		const { file, body: { title, category, tags, note }, params: { userId } } = req;
		try {
			const noteAdded = await Notes.create({
				_userId: userId,
				title,
				category,
				tags,
				photo: file.path,
				note
			});
			if (noteAdded) return res.status(200).json({ message: 'Note was added successfully' });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},
	deleteNote: async (req, res) => {
		const { noteId } = req.params;
		try {
			const deleted = await Notes.findByIdAndRemove({ _id: noteId });
			if (deleted) return res.status(200).json({ message: 'Note was deleted successfully' });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},
	updateNote: async (req, res) => {
		const { params: { noteId }, body, file } = req;

		body.file = file.path;
		Notes.findOneAndUpdate({ _id: noteId }, { $set: req.body }, { new: true })
			.then((note) => {
				return res.status(200).json({ message: `Updated Successfully`, note });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	}
};

module.exports = noteController;
