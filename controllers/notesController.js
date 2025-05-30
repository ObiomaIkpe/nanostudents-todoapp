const Note = require('../models/noteSchema')
const User = require('../models/userSchema')
const mongoose = require('mongoose')



const createNote = async (req, res) => {

    try {
        // Get the user ID from the authenticated request (e.g., from JWT payload)
        const userId = req.user.userId        

        //check if the user exists in the database
        const userExists = await User.findById(userId);
        if(!userExists){
            return res.status(404).json({ message: 'User not found.' });
        }

        const { title, description } = req.body;

        // Basic validation for title
        if (!title || !description) {
            return res.status(400).json({ message: 'Note title is required.' });
        }

        const newNote = new Note({
            title,
            description,
            user: userId 
        });

        const savedNote = await newNote.save();
        res.status(201).json({
            savedNote
        }); 
    }
    catch(error){
        console.log(error)
        res.status(500).json("something went wrong")
    }
}




const getuserNotes = async(req, res) => {
    try {
        // Get the user ID from the authenticated request
        const userId = req.user.userId; // Or req.userId

        // 1.Find all notes where the 'user' field matches the authenticated userId
        // 2. sort({ createdAt: -1 }) can be added for newest notes first
        const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });

        if (!notes || notes.length === 0) {
            return res.status(404).json({ message: 'No notes found for this user.' });
        }

        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching user notes:', error);
        res.status(500).json({ message: 'Server error: Could not retrieve notes.' });
    }
};



// --- 3. Update a particular note
// Requires noteId from params and userId from authentication middleware
const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const userId = req.user.userId; 

        

        const { title, description, completed } = req.body;
        const updateFields = {};

        if (title !== undefined) updateFields.title = title;        
        if (description !== undefined) updateFields.description = description;
        if (completed !== undefined) updateFields.completed = completed;

        
        const updatedNote = await Note.findOneAndUpdate(
            { _id: noteId, user:  userId}, // Query: match noteId AND userId
            { $set: updateFields },        // Update fields
            { new: true }                  // Return the updated document
        );

        if (!updatedNote) {
            // If no note is found or it doesn't belong to the user
            return res.status(404).json({ message: 'Note not found or you do not have permission to update it.' });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Server error: Could not update note.' });
    }
};

// --- 4. Delete a note
// Requires noteId from params and userId from authentication middleware
const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const userId = req.user.id; // Authenticated user ID

        // Validate if noteId and userId are valid MongoDB ObjectIds
        

        // Find the note by its ID AND ensure it belongs to the authenticated user before deleting
        const deletedNote = await Note.findOneAndDelete({ _id: noteId, user: userId });

        if (!deletedNote) {
            // If no note is found or it doesn't belong to the user
            return res.status(404).json({ message: 'Note not found or you do not have permission to delete it.' });
        }

        res.status(200).json({ message: 'Note deleted successfully.', deletedNote });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Server error: Could not delete note.' });
    }
};


module.exports = {createNote, getuserNotes, updateNote, deleteNote}