import { deleteUserAdmin, getAllUsersAdmin, updateUserAdmin } from "../controllers/adminUserController"

const express = require("express")
const { getAllNotesAdmin, deleteNoteAdmin, updateNoteAdmin  } = require("../controllers/adminNotesControllers")
const router = express.Router()


router.route('/admin/notes').get(getAllNotesAdmin)
router.route('/admin/notes/:id').put(updateNoteAdmin)
router.route('/admin/notes/:id').delete(deleteNoteAdmin)


//user resources for admin
router.route('/admin/users').put(getAllUsersAdmin)
router.route('/admin/users/:id').put(updateUserAdmin)
router.route('/admin/users/:id').delete(deleteUserAdmin)


export default router;