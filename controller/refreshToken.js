const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.handleRefreshToken = (req, res, next) => {
    const {email,refreshToken} = req.body;
    if(!email || !refreshToken){
       return res.status(400).json({error:error.message, "message":"please add email and refreshToken"})
    }
    
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or refreshToken"})
        }
        // evaluate jwt 
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || User.email !== decoded.email) return res.sendStatus(403);
                  const accessToken = jwt.sign({_id:savedUser._id},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '12h' });
                 res.status(200).json({success: true,accessToken})
               });
        }).catch(err=>{
            console.log(err)
            res.status(400).json({ 'message': err.message });
        })
};

