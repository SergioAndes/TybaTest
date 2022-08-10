const {validationResult}= require('express-validator');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const user = require('../models/user');

exports.signup=async (req,res,next)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            const error = new Error("Error creating user");
            error.statusCode = 422
            error.data = errors.array()
            throw error
        }
        const name = req.body.name
        const password = req.body.password
        const userName = req.body.userName
        const hasedpw = await bcrypt.hash(password,12)
        const user = new User({
            userName:userName,
            name:name,
            password:hasedpw
        })
        const dbResutl = await user.save()
        res.status(200).json({message:"created", idUser:dbResutl._id})

    }catch(err){
        err.statusCode=500
        console.log(err)
        next(err)
    }


}

exports.login=async (req,res,next)=>{
    const userName= req.body.userName;
    const password= req.body.password;
    let loadedUser;
    try{
        const user = await User.findOne({userName:userName})
        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404
            throw error
        }
        loadedUser=user
        const isEqual = await bcrypt.compare(password,user.password)
        console.log(isEqual)
        if(!isEqual){
            const error = new Error("Wrong Password");
            error.statusCode = 422
            throw error
        }
        const token = jwt.sign(
            {
                userName:loadedUser.userName,
                userId:loadedUser._id.toString()
            }, 'somesuperduperlongsecret',
            {expiresIn:'1h'}
        )
        res.status(200).json({token:token})
    }catch(err){
        err.statusCode=500
        next(err)
    }

}


