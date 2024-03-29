const jwt = require('jsonwebtoken')
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET; //"foobar"
module.exports = (req,res,next)=>{req
    const authHeader = req.get('Authorization')
    if(!authHeader){
        const error = new Error('Not authenticated.')
        error.statusCode = 401;
        throw error
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,jwtSecret)
    }catch(err){
        err.statusCode =500
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Not authenticated.')
        error.statusCode = 401;
        throw error
    }
    req.userId = decodedToken.userId;
    next();
}