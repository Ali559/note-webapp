const router = require('express').Router();
const verifyJwtToken = require('../config/verifyJwtToken');
const { getAllUserNotes, postNotes, getNote, deleteNote, updateNote } = require('../controllers/noteController');
const { upload } = require('../helpers/uploadConfig');
const { validateNoteSchema } = require('../config/validation');
const { deleteImage, deleteImageBeforeRecordIsDeleted } = require('../config/CRUDNotes');

router.get('/:userId', verifyJwtToken, getAllUserNotes);

router.post('/add/:userId', verifyJwtToken, upload.single('note_image'), validateNoteSchema, postNotes);

router.delete('/delete/:noteId', verifyJwtToken, deleteNote);

router.patch('/edit/:noteId', verifyJwtToken, upload.single('note_image'), updateNote);

module.exports = router;
