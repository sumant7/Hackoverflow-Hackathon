const express = require('express');
const router = express.Router();

const User = require('../models/User')
router.get('/',(req,res)=>{
    res.render('register.ejs',{title: "Register",  passerr: '',emailerr:''})
})


router.post('/',async (req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password===cpassword){
            let newUser = new User({
                username: username,
                password: password,
                from1: "",
                till1:"",
                freedate:"",
                name:""
            })
            newUser.save()
            .then((item)=>{
                res.render('login.ejs',{title: "Done",  passerr: '',emailerr:''})
            })
            .catch(err=> console.log(err))
            console.log("Ok")
        }else{
            res.render('register.ejs',{title: "Register",  passerr: 'Passwords not Matching',emailerr:''})
        }
    }catch(err){
        res.render('register.ejs',{title: "Error",  passerr: '',emailerr:''})
    }
})

module.exports = router;