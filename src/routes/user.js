const express = require('express')
const router = new express.Router();
const User = require('../models/user')
const Blog = require('../models/blog')
const auth = require('../middleware/auth')


router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        // const token = await user.genrateAuthToken();
        await user.save();

        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e);
    }


})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.genrateAuthToken();

        res.send({ user, token })
    } catch (e) {
        res.status(404).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save()
        res.send({ 'success': 'You have logged out' })
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async (req, res) => {

    try {
        req.user.tokens = [];
        await req.user.save()
        res.send({ 'success': 'You have logged out from all devices' })
    } catch (e) {
        res.status(500).send(e)
    }
})


router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const validUpdates = ['name', 'email', 'password', 'age'];
    const isValid = updates.every((update) => {
        return validUpdates.includes(update)
    })
    if (!isValid)
        return res.status(400).send({ "error": "Not a valid field to be updated" })
    try {
        updates.forEach((update) => {
            return req.user[update] = req.body[update]
        })

        await req.user.save()

        res.send({ 'success': 'Succesfully updated The Profile', 'User': req.user })
    } catch (e) {
        res.status(400).send(e)
    }
})



router.delete('/users/me', auth, async (req, res) => {
    try {

        const deletedTasks = await Blog.deleteMany({ 'owner': req.user._id })
        const deleted = await User.findOneAndDelete({ _id: req.user._id });
        res.send(deleted)
    } catch (e) {
        res.status(400).send(e)
    }

})


module.exports = router;