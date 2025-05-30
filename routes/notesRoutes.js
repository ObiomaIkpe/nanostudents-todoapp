const express = require("express")
const {createNote, getuserNotes, updateNote, deleteNote} = require("../controllers/notesController")

const protect = require("../middlewares/protect")

const router = express.Router()

//middleware
router.use(protect)


router.route('/create-note').post(createNote)
router.route('/get-user-notes').get(getuserNotes)
router.route('/update-note/:id').patch(updateNote)
router.route('/delete-note/:id').delete(deleteNote)


module.exports = router