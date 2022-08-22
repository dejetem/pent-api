const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()

exports.signup = (req, res, next) => {
  const {name,email,password} = req.body 
  if(!email || !password || !name){
     return res.status(400).json({error:'name, email and password are required.'})
  }
   User.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:'user already exists with that email'})
      }
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
    
            user.save()
            .then(user=>{
                console.log(user);
                res.status(201).json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err);
                res.status(400).json({ 'message': err.message });
            })
      })
     
  })
  .catch(err=>{
    console.log(err);
    res.status(400).json({ 'message': err.message });
  })
};

exports.login = (req, res, next) => {
    const {email,password} = req.body
    if(!email || !password){
       return res.status(400).json({error:"please add email and password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const accessToken = jwt.sign({_id:savedUser._id},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '12h' });
               const refreshToken = jwt.sign({_id:savedUser._id},process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1d' });
               const {_id,name,email} = savedUser
               res.status(200).json({accessToken,refreshToken,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({ 'message': err.message });
        })
    })
};