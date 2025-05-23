const express = require("express")
const {createNote, getuserNotes, updateNote, deleteNote} = require("../controllers/notesController")

const {verifyToken} = require("../middlewares/isAdmin")

const router = express.Router()

//middleware
// router.use(verifyToken)


router.route('/create-note').post(verifyToken, createNote)
router.route('/get-user-notes').get(getuserNotes)
router.route('/update-note/:id').put(updateNote)
router.route('/delete-note/:id').delete(deleteNote)


module.exports = router