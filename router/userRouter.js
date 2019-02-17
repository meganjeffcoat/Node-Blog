const express = require('express');
const router = express.Router();

const Users = require('../data/helpers/userDb');

router.get('/', async (req, res) => {
    try {
        const users = await Users.get();
        res.status(200).json(users);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving users'})
    }
})
//GET user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);
        if (user){
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'The user with the specified ID could not be found'});
        }
    } catch {
        res.status(500).json({ message: 'The user information could not be retrieved'})
    }
})
//Add user
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name){
            res.status(400).json({ message: 'Please enter a username to continue'})
        } else {
            const newUser = await Users.insert(req.bod);
            res.status(201).json(newUser)
        }
    } catch {
        res.status(500).json({ message: 'The user could not be added to our database'})
    }
})

module.exports = router;