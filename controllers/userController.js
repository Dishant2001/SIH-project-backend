const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const mongoose = require('mongoose')
var logged = false;
var EmailId = '';

const loginUser = asyncHandler(async (req,res) => {
    const {email, password } = req.body;

    const user = await User.findOne({ email });

    if(!logged && user && (await user.matchPassword(password))){
        
        req.session.loggedin = true;
        req.session.user = email;
        EmailId = email;
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
    EmailId='';
    res.send("logout success!");
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

const addProject = asyncHandler(async (req,res) => {
    const {name, description, funds_proposed, funds_approved, funds_used, category,status, duration } = req.body;

    const userExists = await User.findOne({ EmailId });

    if(logged && userExists){

        const user = await User.updateOne({email:EmailId},{$push:{ project:
            {name, description,funds_proposed,funds_approved,funds_used, category,status, duration}
           }})
       
           if(user){
               res.status(201).json({
                   _id: user._id,
                   name: user.name,
                   email: user.email,
                   role: user.role,
                   project:user.project,
                   token: generateToken(user._id)
               });
       
           }else{
               res.status(400);
               throw new Error("Error occured");
           }
    }else{
        res.status(400);
        throw new Error('First login'); 
    }

    

});


const applied = asyncHandler(async (req,res) => {
    // const {email, password } = req.body;

    // const user = await User.findOne({ email });

    if(logged){
        
        console.log(EmailId);
        const projects = await User.findOne({email:EmailId});
        // console.log(projects.project);
        // console.log(projects.project);
        // res.status(200);
        const applied=[];
        for(var i=0;i<projects.project.length;++i){
            // console.log(JSON.stringify(projects.project.status));
            if(projects.project[i].status=="applied"){
                // console.log(projects.project[i]);
                applied.push(projects.project[i]);
            }
        }
        
        res.json(applied);
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

const ongoing = asyncHandler(async (req,res) => {
    // const {email, password } = req.body;

    // const user = await User.findOne({ email });

    if(logged){
        
        console.log(EmailId);
        const projects = await User.findOne({email:EmailId});
        // console.log(projects.project);
        // console.log(projects.project);
        // res.status(200);
        const ongoing=[];
        for(var i=0;i<projects.project.length;++i){
            // console.log(JSON.stringify(projects.project.status));
            if(projects.project[i].status=="ongoing"){
                // console.log(projects.project[i]);
                ongoing.push(projects.project[i]);
            }
        }
        
        res.json(ongoing);
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

const completed = asyncHandler(async (req,res) => {
    // const {email, password } = req.body;

    // const user = await User.findOne({ email });

    if(logged){
        
        console.log(EmailId);
        const projects = await User.findOne({email:EmailId});
        // console.log(projects.project);
        // console.log(projects.project);
        // res.status(200);
        const completed=[];
        for(var i=0;i<projects.project.length;++i){
            // console.log(JSON.stringify(projects.project.status));
            if(projects.project[i].status=="completed"){
                // console.log(projects.project[i]);
                completed.push(projects.project[i]);
            }
        }
        
        res.json(completed);
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

const heilist = asyncHandler(async (req,res) => {
    // const {email, password } = req.body;

    // const user = await User.findOne({ email });

        const heis = await User.find({role:{$in:["hei","HEI"]}});
        console.log(heis);
        // res.status(200);
        
        res.json(heis);
});

const falist = asyncHandler(async (req,res) => {
    // const {email, password } = req.body;

    // const user = await User.findOne({ email });

        const fa = await User.find({role:{$in:["fa","FA"]}});
        console.log(fa);
        // res.status(200);
        
        res.json(fa);
});

var projectId='';

const getProjectId = asyncHandler(async (req, res)=>{
    projectId = req.params['_id'];
    console.log(projectId);
    res.status(200).json({_id:projectId});
});

const applytofa = asyncHandler(async (req,res) => {
    const faemail = req.params['_id'];
    console.log(faemail);
    // const {name, description, funds_proposed, funds_approved, funds_used, category,status, duration } = req.body;

    const userExists = await User.findOne({ email:faemail });
    // const hei = await User.findOne({email:EmailId});


    if(logged && userExists){



        // const user = await User.updateOne({email:faemail},{$push:{ fa_applications:
        //     {project:projectId,hei:EmailId}
        //    }});
        const user = await User.findOne({email:faemail});
        var check=-1;
        for(var i=0;i<user.fa_applications.length;++i){
            if(user.fa_applications[i].hei==EmailId){
                user.fa_applications[i].project.push(projectId);
                check=1;
                break;
            }
        }
        if(check!=1){
            user.fa_applications.push({hei:EmailId,project:[projectId]}); 
        }
        await user.save();
        
        // const hei = await User.findOneAndUpdate({email:EmailId,"project._id":mongoose.Types.ObjectId(projectId)},{fa_applied:faemail,applied:true});
        const hei = await User.findOne({email:EmailId});
        console.log(hei);

        for(var i=0;i<hei.project.length;++i){
            if(hei.project[i]._id.toString()==projectId){
                hei.project[i].fa_applied=faemail;
                // hei.project[i].applied=true;
                hei.project[i].status="applied";
                break;
            }
        }
        await hei.save();


           if(user&&hei){
            //    res.status(201).json({
            //        _id: user._id,
            //        name: user.name,
            //        email: user.email,
            //        role: user.role,
            //        project:user.project,
            //        token: generateToken(user._id)
            //    });
            console.log("FA, HEI connected");
            res.status(200).json({_id:projectId,hei:EmailId});
       
           }else{
               res.status(400);
               throw new Error("Error occured");
           }
    }else{
        res.status(400);
        throw new Error('First login'); 
    }

});


const acceptApproval = asyncHandler(async (req,res) => {
    const {email,p_id} = req.body;
    // const {name, description, funds_proposed, funds_approved, funds_used, category,status, duration } = req.body;

    const userExists = await User.findOne({ email:EmailId });
    // const hei = await User.findOne({email:EmailId});


    if(logged && userExists){



        // const user = await User.updateOne({email:faemail},{$push:{ fa_applications:
        //     {project:projectId,hei:EmailId}
        //    }});
        const user = await User.findOne({email:email});
        for(var i=0;i<user.project.length;++i){
            if(user.project[i]._id.toString()==p_id){
                user.project[i].accepted=true;
                break;
            }
        }
        await user.save();

           if(user){
            //    res.status(201).json({
            //        _id: user._id,
            //        name: user.name,
            //        email: user.email,
            //        role: user.role,
            //        project:user.project,
            //        token: generateToken(user._id)
            //    });
            console.log("Proposal accepted");
            res.status(200).json({hei:email,p_id:p_id});
       
           }else{
               res.status(400);
               throw new Error("Error occured");
           }
    }else{
        res.status(400);
        throw new Error('First login'); 
    }

});

const rejectApproval = asyncHandler(async (req,res) => {
    const {email,p_id} = req.body;
    // const {name, description, funds_proposed, funds_approved, funds_used, category,status, duration } = req.body;

    const userExists = await User.findOne({ email:EmailId });
    // const hei = await User.findOne({email:EmailId});


    if(logged && userExists){



        // const user = await User.updateOne({email:faemail},{$push:{ fa_applications:
        //     {project:projectId,hei:EmailId}
        //    }});
        const user = await User.findOne({email:email});
        for(var i=0;i<user.project.length;++i){
            if(user.project[i]._id.toString()==p_id){
                user.project[i].fa_applied="none";
                user.project[i].status="none";
                user.project[i].accepted=false;
                break;
            }
        }
        await user.save();

        const fa = await User.findOne({email:EmailId});
        console.log(fa);

        var check=-1;
        for(var i=0;i<fa.fa_applications.length;++i){
            if(fa.fa_applications[i].hei==email){
                check=1;
                for(var j=0;j<fa.fa_applications[i].project.length;++j){
                    if(fa.fa_applications[i].project[j]==p_id){
                        fa.fa_applications[i].project.splice(j,1);
                        break;
                    }
                }
            }
            if(check==1)
                break;
        }
        await fa.save();

           if(user&&fa){
            //    res.status(201).json({
            //        _id: user._id,
            //        name: user.name,
            //        email: user.email,
            //        role: user.role,
            //        project:user.project,
            //        token: generateToken(user._id)
            //    });
            console.log("Proposal accepted");
            res.status(200).json({hei:email,p_id:p_id});
       
           }else{
               res.status(400);
               throw new Error("Error occured");
           }
    }else{
        res.status(400);
        throw new Error('First login'); 
    }

});


const fafundings = asyncHandler(async (req,res) => {
    const faemail = req.params['_id'];
    console.log(faemail);
    // const {name, description, funds_proposed, funds_approved, funds_used, category,status, duration } = req.body;

    const userExists = await User.findOne({ email:faemail });
    // const hei = await User.findOne({email:EmailId});


    if(logged && userExists){



        // const user = await User.updateOne({email:faemail},{$push:{ fa_applications:
        //     {project:projectId,hei:EmailId}
        //    }});
        const list=[];
        const user = await User.findOne({email:faemail});
        var check=-1;
        for(var i=0;i<user.fa_applications.length;++i){
            const hei=user.fa_applications[i].hei;
            let temp = await User.findOne({email:hei});
            let heiproject = temp.project;
            console.log(heiproject);
            for(var j=0;j<user.fa_applications[i].project.length;++j){
                for(var k=0;k<heiproject.length;++k){
                    if(user.fa_applications[i].project[j]==heiproject[k]._id.toString()){
                        console.log(user.fa_applications[i].project[j]);
                        console.log(heiproject[k]._id.toString());
                        list.push(heiproject[k]);
                    }
                }
            }
        }

        console.log(list);


           if(user){
            //    res.status(201).json({
            //        _id: user._id,
            //        name: user.name,
            //        email: user.email,
            //        role: user.role,
            //        project:user.project,
            //        token: generateToken(user._id)
            //    });
            // console.log("FA, HEI connected");
            res.status(200).json(list);
       
           }else{
               res.status(400);
               throw new Error("Error occured");
           }
    }else{
        res.status(400);
        throw new Error('First login'); 
    }

});


module.exports = { registerUser, loginUser, logoutUser, addProject, applied,ongoing,completed, heilist, falist,applytofa,getProjectId, acceptApproval,rejectApproval, fafundings };