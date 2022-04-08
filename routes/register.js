const express = require('express');
const router = express.Router();
let message = ""
router.get('/',(req,res)=>{
    res.render('register.ejs',{title: "Register",  passerr: '',emailerr:''})
})


router.post('/',async (req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        
    }catch(err){
        res.render('register.ejs',{title: "Error",  passerr: '',emailerr:''})
    }
})

module.exports = router;