const Note = require('../models/Note');
const User = require('../models/User'); 
const mongoose = require('mongoose');


const getAllUsersAdmin = async (req, res) => {
    try {
        // Fetch all users, exclude password for security
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found in the system.' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users for admin:', error);
        res.status(500).json({ message: 'Server error: Could not retrieve all users.' });
    }
};



const updateUserAdmin = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format.' });
        }

        const { username, email, role } = req.body; // Admin can update username, email, and role
        const updateFields = {};

        if (username !== undefined) updateFields.username = username;
        if (email !== undefined) updateFields.email = email;
        if (role !== undefined) updateFields.role = role; // Crucial for admin role management

        // Admin can update any user
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: updateFields },
            { new: true, select: '-password' } // Exclude password from the returned object
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user by admin:', error);
        res.status(500).json({ message: 'Server error: Could not update user.' });
    }
};


const deleteUserAdmin = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format.' });
        }

        // Admin can delete any user
        const deletedUser = await User.findOneAndDelete({ _id: userId });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Optional: Also delete all notes associated with this user
        await Note.deleteMany({ user: userId });

        res.status(200).json({ message: 'User and associated notes deleted successfully by admin.', deletedUser });
    } catch (error) {
        console.error('Error deleting user by admin:', error);
        res.status(500).json({ message: 'Server error: Could not delete user.' });
    }
};


module.exports = {getAllUsersAdmin, updateUserAdmin, deleteUserAdmin}
