const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    transactions:[{ 
        type:Schema.Types.ObjectId,
        ref:'Transaccion'
    }]
})

module.exports = mongoose.model('User',userSchema)