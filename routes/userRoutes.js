const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create User
router.post('/add', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error creating user.');
    }
});

// Read Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', { users });
    } catch (error) {
        res.status(500).send('Error fetching users.');
    }
});

// Update User
router.post('/update/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error updating user.');
    }
});

// Delete User
router.post('/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting user.');
    }
});

module.exports = router;
