const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

var logged = false;

const loginUser = asyncHandler(async (req,res) => {
    const {email, password } = req.body;

    const user = await User.findOne({ email });

    if(!logged && user && (await user.matchPassword(password))){
        
        req.session.loggedin = true;
        req.session.user = email;
        logged = true;
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
        /* Session after login:

                Session {
                    cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
                    loggedin: true,
                    user: 'email3'
                }

            */

    }else{
        res.status(401);
        throw new Error("Incorrect email or password");
    }
});

const logoutUser = asyncHandler(async (req,res) => {
    req.session.destroy();
    logged=false;
    res.send("logout success!");
});


const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists'); 
    }

    const project={
        name:"project",
        description:"project"
    }

    const user = await User.create({
     name, email, password, role,project
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    }else{
        res.status(400);
        throw new Error("Error occured");
    }

});


module.exports = { registerUser, loginUser, logoutUser };