const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

const loginUser = asyncHandler(async (req,res) => {
    const {email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error("Incorrect email or password");
    }
});


const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists'); 
    }

    const user = await User.create({
     name, email, password, role
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


module.exports = { registerUser, loginUser };