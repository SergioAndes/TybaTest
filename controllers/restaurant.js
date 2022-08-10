
const user = require('../models/user');
const Transacction =require('../models/transaccion')
const googleService = require('../services/googleService');
const {validationResult}= require('express-validator');

exports.getRestaurants= async (req,res,next)=>{

    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            const error = new Error("Error en coordenadas ingresadas");
            error.statusCode = 400
            error.data = errors.array()
            throw error
        }
        const restaurantList =  await googleService.getRestaurants(req.body.lat,req.body.lng)
        if(restaurantList.status=="INVALID_REQUEST"){
            const error = new Error("Invalid Request");
            error.statusCode = 500
            throw error
        }
        //Create transacction
        const latitude = req.body.lat
        const longitude = req.body.lng
        const creator = req.userId
        const transacction = new Transacction({
            latitude:latitude,
            longitude:longitude,
            creator:creator
        });
        await transacction.save()  
        res.status(200).json(restaurantList)

    }catch(err){
        err.statusCode=500
        console.log(err)
        next(err)
    }
}

exports.getTransactions= async (req,res,next)=>{
    const transactionId =  req.userId
    Transacction.find({"creator":transactionId}).exec()
    .then(transacctions=>{
        if(!transacctions){
            const error = new Error("This user does not have transactions");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(transacctions)
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    });

}
