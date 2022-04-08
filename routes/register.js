const express = require('express');
const router = express.Router();

const User = require('../models/User')
router.get('/', (req, res) => {
    res.render('register.ejs', { title: "Register", passerr: '', usernameerr: '' })
})


router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {

            let newUser = new User({
                username: username,
                password: password,
                from1: "",
                till1: "",
                freedate: "",
                name: ""
            })
            newUser.save()
                .then((item) => {
                    res.render('login.ejs', { title: "Done", passerr: '', usernameerr: '' })
                })
                .catch(err=> console.log(err))
            const testuser = await User.findOne({ username: username })
            if(username === testuser.username)
            {
                res.render('register.ejs', { title: "", passerr: '', usernameerr: 'Username Already exits' })
            }
            else
            {
                console.log("Error")
            }
        } else {
            res.render('register.ejs', { title: "Register", passerr: 'Passwords not Matching', usernameerr: '' })
        }
    } catch (err) {
        res.render('register.ejs', { title: "Error", passerr: '', usernameerr: '' })
    }
})


module.exports = router;