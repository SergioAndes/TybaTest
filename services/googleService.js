const axios = require('axios').default;
require('dotenv').config();

const apiKey = process.env.GOOGLE_KEY; // "foobar"

module.exports.getRestaurants = async (lat,lng)=>{
    try{
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lng+'&radius=1000&type=restaurant&key='+apiKey)
        return response.data
    }catch(err){
        err.statusCode=500
        console.log(err)
        next(err)
    }

} 