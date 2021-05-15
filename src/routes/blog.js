const express = require('express')
const router = new express.Router();
const Blog = require('../models/blog')
const auth = require('../middleware/auth')

router.post('/blogs', auth, async (req, res) => {
    const blog = new Blog({ ...req.body, owner: req.user._id });

    try {
        await blog.save();
        res.status(201).send({ 'success': 'You have succesfully created your Blog', 'blog': blog })
    } catch (e) {
        res.status(400).send(e);
    }

})



router.get('/blogs', auth, async (req, res) => {
    try {


        const blogs = await Blog.find({
            owner: req.user._id
        })
        res.send(blogs)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/blogs/:title', auth, async (req, res) => {

    try {
        const blog = await Blog.findOne({ title: req.params.title, owner: req.user._id });
        if (!blog)
            return res.status(404).send({ 'error': 'No Blog found in this account' });
        res.send(blog)
    } catch (e) {
        res.status(500).send()
    }

})



router.patch('/blogs/:title', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const validUpdates = ['description', 'title']
    const isValid = updates.every((update) => {
        return validUpdates.includes(update)
    })

    if (!isValid)
        return res.status(400).send({ "error": "Not a valid field to be updated" })

    try {
        const blog = await Blog.findOne({ title: req.params.title, owner: req.user._id })

        if (!blog)
            return res.status(404).send()

        updates.forEach((update) => {
            return blog[update] = req.body[update]
        })

        await blog.save()
        res.send({ 'success': 'You have succesfully updated your  Blog', 'Updated Blog': blog })
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/blogs/:title', auth, async (req, res) => {

    try {
        const deleted = await Blog.findOneAndDelete({ title: req.params.title, owner: req.user._id })
        if (!deleted)
            return res.status(404).send()
        res.send({ 'success': 'You have succesfully deleted your  Blog', 'Deleted Blog': deleted })
    } catch (e) {
        res.status(400).send(e)
    }
})




module.exports = router;