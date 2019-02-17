const express = require('express');
const router = express.Router();

const Posts = require('../data/helpers/postDb');


router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get();
        res.status(200).json(posts);
    } catch {
        res.status(500).json({ error: 'There was an error retrieving the posts'})
    }
})

module.exports = router;

