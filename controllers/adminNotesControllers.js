const Note = require('../models/Note');
const User = require('../models/User'); 
const mongoose = require('mongoose');



const getAllNotesAdmin = async (req, res) => {
    try {
        // No userId filter needed here, as admin sees all notes
        const notes = await Note.find().sort({ createdAt: -1 });

        if (!notes || notes.length === 0) {
            return res.status(404).json({ message: 'No notes found in the database.' });
        }

        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching all notes for admin:', error);
        res.status(500).json({ message: 'Server error: Could not retrieve all notes.' });
    }
};

//admin can update any note by ID
const updateNoteAdmin = async (req, res) => {
    try {
        const noteId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ message: 'Invalid note ID format.' });
        }

        const { title, description, completed, user } = req.body; // Admin can also change the owner
        const updateFields = { updatedAt: Date.now() };

        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (completed !== undefined) updateFields.completed = completed;
        // Admin can reassign a note to another user
        if (user !== undefined) {
            if (!mongoose.Types.ObjectId.isValid(user)) {
                return res.status(400).json({ message: 'Invalid user ID format for reassignment.' });
            }
            // Optional: Check if the new user exists
            const newUserExists = await User.findById(user);
            if (!newUserExists) {
                return res.status(404).json({ message: 'Target user for reassignment not found.' });
            }
            updateFields.user = user;
        }

        // Admin can update any note, no user ID filter in query
        const updatedNote = await Note.findOneAndUpdate(
            { _id: noteId }, // Query only by note ID
            { $set: updateFields },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error('Error updating note by admin:', error);
        res.status(500).json({ message: 'Server error: Could not update note.' });
    }
};



// --- Admin: Delete any note by ID ---

const deleteNoteAdmin = async (req, res) => {
    try {
        const noteId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ message: 'Invalid note ID format.' });
        }

        // Admin can delete any note, no user ID filter in query
        const deletedNote = await Note.findOneAndDelete({ _id: noteId });

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        res.status(200).json({ message: 'Note deleted successfully by admin.', deletedNote });
    } catch (error) {
        console.error('Error deleting note by admin:', error);
        res.status(500).json({ message: 'Server error: Could not delete note.' });
    }
};




module.exports = {getAllNotesAdmin, updateNoteAdmin, deleteNoteAdmin}