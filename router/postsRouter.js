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
//GET post by id
router.get('/:id', async (req, res) => {
    try{
        const post = await Posts.getById(req.params.id);
        if (post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post with the specified ID could not be retrieved'});
        }
    } catch {
        res.status(500).json({ message: 'The post information could not be retrieved'})
    }
})
//add post
router.post('/', async (req, res) => {
    try {
        const { text, user_id } = req.body;
        if (!text || !user_id){
            res.status(400).json({ message: 'Please enter both post text and username to continue'})
        } else {
            const newPost = await Posts.insert(req.body);
            res.status(201).json(newPost);
        }
    } catch {
        res.status(500).json({ message: 'The post could nto be added'})
    }
})

module.exports = router;

