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
today = dd + '/' + mm + '/' + yyyy;

router.post('/register', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {
            const testuser = await User.findOne({ username: username })
            if (username === testuser.username) {
                res.render('register.ejs', { title: "", passerr: '', usernameerr: 'Username Already Exists' })
            }
            else {
                console.log("Error")
            
            let newUser = new User({
                username: username,
                password: password,
                from1: "",
                till1: "",
                name: ""
            })
            newUser.save()
                .then((item) => {
                    res.render('register.ejs', { title: "", passerr: '', usernameerr: 'Sign Up Successful' })
                })
                .catch(err => console.log(err))
            }
            
        } else {
            res.render('register.ejs', { title: "Register", passerr: 'Passwords not Matching', usernameerr: '' })
        }
    } catch (err) {
        res.render('register.ejs', { title: "Register", passerr: 'Succesful', usernameerr: '' })
    }
})


let show=[]
//signin

router.post('/login',async (req,res)=>{
    const username = req.body.lusername
    const password = req.body.lpassword
    const result = await User.findOne({ username: username })
    console.log(result)
        if(result==null)
        {
            res.render('register.ejs', { title: "Register", passerr: 'Incorrect Username or Password', usernameerr: '' })
        }
        else if(username === result.username && password===result.password)
        {
            res.render('dashboard',{user: result, mainname: result.username, date: today, message:'',show: show})
        }
        else
        {
            res.render('register.ejs', { title: "Register", passerr: 'Incorrect Username or Password', usernameerr: '' })
        }
})



//adding team member
router.post('/add', async(req,res)=>{
    const name= req.body.addname
    const main = req.body.none
    const testuser = await User.findOne({ name: name })
    if(testuser===null)
    {
        let newUser = new User({
            username: name,
            check: main,
            name: name
        })
        newUser.save()
        .then((item) => {
            res.render('dashboard',{ date: today, message:'User Added!',mainname: main,show: []})
        })
        .catch(err => console.log(err))
    }
    else if(testuser.name===name)
    {
        res.render('dashboard',{ date: today, message:'User Already Present!',mainname: main,show: []})
    }
    else
    {
        console.log("Error")
    }
})



//deleting user
router.post('/delete', async(req,res)=>{
    const dname= req.body.deletename
    const main = req.body.none
    const testuser = await User.findOne({ name: dname, check: main })
    if(testuser===null)
    {
        res.render('dashboard',{ date: today, message:'User Does not Exist',mainname: main,show: []})
    }
    else if(testuser.name===dname)
    {
        await User.deleteOne({name: dname, check: main})
        res.render('dashboard',{ date: today, message:'User Deleted!',mainname: main,show: []})
    }
    else
    {
        console.log("Error")
    }
})



//updating userdetails
router.post('/update', async(req,res)=>{
    const name= req.body.username
    const from1= req.body.from1
    const to1= req.body.to1
    const from2= req.body.from2
    const to2= req.body.to2
    const from3= req.body.from3
    const to3= req.body.to3
    const main = req.body.none
    const testuser = await User.findOne({ name: name, check: main })
    if(testuser===null)
    {
        res.render('dashboard',{ date: today, message:'User Does not Exist, Add the User First!',mainname: main,show: []})
    }
    else if(testuser.name===name)
    {
        await User.updateOne({name:name},{ $set: { from1: from1, from2: from2, from3: from3, till1: to1, till2: to2, till3: to3  } })
        res.render('dashboard',{ date: today, message:'User Details Updated!',mainname: main,show: []})
    }
    else
    {
        console.log("Error")
    }
})


//viewing the details
router.post('/view', async(req,res)=>{
    const username= req.body.username
    const main = req.body.none
    const testuser = await User.findOne({ name: username, check: main })
    if(testuser===null)
    {
        res.render('dashboard',{ date: today, message:'User Does not Exist',mainname: main,show:[]})
    }
    else if(testuser.name===username)
    {
        show.push(username)
        show.push(testuser.from1)
        show.push(testuser.till1)
        show.push(testuser.from2)
        show.push(testuser.till2)
        show.push(testuser.from3)
        show.push(testuser.till3)
        res.render('dashboard',{ date: today, message:'User Deleted!',mainname: main,show:show})
    }
    else
    {
        console.log("Error")
    }
})



//tasks section
router.post('/todo',async(req,res)=>{
    const main = req.body.none
    const testuser = await User.findOne({ username: main })
    const task = testuser.todo
    res.render('todo.ejs',{mainname: main, list: task,message:""}) 
})



//adding new task
router.post('/todo/add',async(req,res)=>{
    const todo= req.body.add
    const none= req.body.none
    if(todo==="")
    {
        const testuser = await User.findOne({ username: none })
        const task = testuser.todo
        res.render('todo.ejs',{mainname: none, list: task,message:""})
    }
    else
    {
        await User.updateOne({username:none},{ $push: { todo: todo }})
        const testuser = await User.findOne({ username: none })
        const task = testuser.todo
        res.render('todo.ejs',{mainname: none, list: task,message:"Added!"})
    }
    
})
module.exports = router;




//deleteing item
router.post("/todo/delete",async(req,res)=>{
    const i= req.body.index
    const none= req.body.none
    const testuser = await User.findOne({ username: none })
    const task = testuser.todo
    var r = task.splice(i,1)
    await User.updateOne({username:none},{ $set: { todo: task}})
    res.render('todo.ejs',{mainname: none, list: task,message:"Deleted!"})
})