const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('register.ejs',{title: "Register"})
})


module.exports = router;