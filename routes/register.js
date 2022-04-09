const express = require('express');
const router = express.Router();

const User = require('../models/User')
router.get('/', (req, res) => {
    res.render('register.ejs', { title: "Register", passerr: '', usernameerr: '' })
})


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

router.post('/register', async (req, res) => {
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
                    res.render('login.ejs', { title: "Login" })
                })
                .catch(err => console.log(err))
            const testuser = await User.findOne({ username: username })
            if (username === testuser.username) {
                res.render('register.ejs', { title: "", passerr: '', usernameerr: 'Username Already Exists' })
            }
            else {
                console.log("Error")
            }
        } else {
            res.render('register.ejs', { title: "Register", passerr: 'Passwords not Matching', usernameerr: '' })
        }
    } catch (err) {
        res.render('register.ejs', { title: "Error", passerr: '', usernameerr: '' })
    }
})



//signin

router.post('/login',async (req,res)=>{
    const username = req.body.lusername
    const password = req.body.lpassword
    const result = await User.findOne({ username: username })
    // User.findOne({username: username},(err,result)=>{
    //     if(username === result.username && password===result.password)
    //     {
    //         res.render('dashboard',{user: result})
    //     }
    //     else
    //     {
    //         res.render('register.ejs', { title: "Register", passerr: 'Incorrect Username or Password', usernameerr: '' })
    //         console.log(err)
    //     }
    // })
    console.log(result)
        if(result==null)
        {
            res.render('register.ejs', { title: "Register", passerr: 'Incorrect Username or Password', usernameerr: '' })
        }
        else if(username === result.username && password===result.password)
        {
            res.render('dashboard',{user: result, mainname: result.username, date: today})
        }
        else
        {
            res.render('register.ejs', { title: "Register", passerr: 'Incorrect Username or Password', usernameerr: '' })
        }
})





module.exports = router;