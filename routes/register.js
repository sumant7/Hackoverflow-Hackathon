const express = require('express');
const router = express.Router();
let message = ""
router.get('/',(req,res)=>{
    res.render('register.ejs',{title: "Register", message: message})
})


module.exports = router;