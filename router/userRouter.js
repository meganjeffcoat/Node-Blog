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

module.exports = router;