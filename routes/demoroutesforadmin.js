// routes/index.js (or app.js/server.js where you define your main routes)

const express = require('express');
const router = express.Router(); // Create a main router for all routes

// --- Middleware Imports ---
const { protect } = require('../middleware/authMiddleware'); // Your authentication middleware
const { isAdmin } = require('../middleware/adminAuthMiddleware'); // Your admin authorization middleware

// --- Controller Imports ---
// User-specific note controllers
const {
    createNote,
    getAllUserNotes, // Renamed from getuserNotes for clarity, as per previous discussion
    updateNote,
    deleteNote
} = require('../controllers/noteController');

// Admin-specific note controllers (from noteController.js)
const {
    getAllNotesAdmin,
    updateNoteAdmin,
    deleteNoteAdmin
} = require('../controllers/noteController');

// Admin-specific user controllers (from userController.js)
const {
    getAllUsersAdmin,
    updateUserAdmin,
    deleteUserAdmin
} = require('../controllers/userController');


// --- 1. User-Specific Note Routes ---
// These routes require a user to be authenticated (`protect`) to access their own notes.
// They do NOT require admin privileges.

// POST /api/notes/create-note - Create a new note for the authenticated user
router.post('/notes/create-note', protect, createNote);

// GET /api/notes/get-user-notes - Get all notes belonging to the authenticated user
router.get('/notes/get-user-notes', protect, getAllUserNotes);

// PUT /api/notes/update-note/:id - Update a specific note belonging to the authenticated user
router.put('/notes/update-note/:id', protect, updateNote);

// DELETE /api/notes/delete-note/:id - Delete a specific note belonging to the authenticated user
router.delete('/notes/delete-note/:id', protect, deleteNote);


// --- 2. Admin-Specific Routes ---
// These routes require both authentication (`protect`) AND admin privileges (`isAdmin`).
// They allow admins to manage all notes and all users in the system.

// --- Admin Notes Management ---
// GET /api/admin/notes - Get all notes in the system (for admin)
router.get('/admin/notes', protect, isAdmin, getAllNotesAdmin);

// PUT /api/admin/notes/:id - Update any note by ID (for admin)
// DELETE /api/admin/notes/:id - Delete any note by ID (for admin)
router.route('/admin/notes/:id')
    .put(protect, isAdmin, updateNoteAdmin)
    .delete(protect, isAdmin, deleteNoteAdmin);


// --- Admin User Management ---
// GET /api/admin/users - Get all users in the system (for admin)
router.get('/admin/users', protect, isAdmin, getAllUsersAdmin);

// PUT /api/admin/users/:id - Update any user by ID (for admin)
// DELETE /api/admin/users/:id - Delete any user by ID (for admin)
router.route('/admin/users/:id')
    .put(protect, isAdmin, updateUserAdmin)
    .delete(protect, isAdmin, deleteUserAdmin);


module.exports = router; // Export the main router
