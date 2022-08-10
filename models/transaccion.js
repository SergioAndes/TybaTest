const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const transaccionSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    latitude:{
        type: String,
        required:true
    },
    longitude:{
        type: String,
        required:true
    },
    
})
transaccionSchema.set('timestamps', true);
module.exports = mongoose.model('Transaccion',transaccionSchema)