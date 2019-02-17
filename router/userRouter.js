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
//GET posts from userID
router.get('/posts/:userId', (req, res) => {
    const { userId } = req.params;
    Users
        .getUserPosts(userId)
        .then(userPosts => {
            if (userPosts === 0){
                res.status(404).json({ message: "No posts from this user could be found "});
            } else {
                res.status(200).json(userPosts);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving the posts "})
        });
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
//Delete user by id
router.delete('/:id', async (req, res) => {
    try {
        const count = await Users.remove(req.params.id);
        if (count > 0){
            res.status(200).json({ message: 'User successfully removed'});
        } else {
            res.status(404).json({ message: 'The user with the requested ID does not exist'})
        }
    } catch {
        res.status(500).json({ message: 'Error deleting this user'});
    }
})
//Update user by id
router.put('/:id', async (req, res) => {
    try {
        const { username } = await Users.update(req.body);
        const { id } = await Users.update(req.params.id);
        if (!username || !id){
            res.status(400).json({ message: 'Please provide both a username and an id to updat'})
        } else {
            const updatedUser = await Users.inster(req.body);
            res.status(200).json(updatedUser);
        }
    } catch {
        res.status(500).json({ message: 'Error updating this user'});
    }
})

module.exports = router;