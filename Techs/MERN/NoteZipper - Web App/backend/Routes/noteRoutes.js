const express = require('express');
const { getNotes, getNoteById, DeleteNote, UpdateNote, CreateNote } = require('../controllers/noteController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route("/").get(protect, getNotes);

router
  .route("/:id")
  .get(getNoteById)
  .delete(protect, DeleteNote)
  .put(protect, UpdateNote);

router.route("/create").post(protect, CreateNote);  

module.exports = router