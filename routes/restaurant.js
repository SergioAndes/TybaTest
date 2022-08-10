const express = require('express');
const router = express.Router()
const restaurantController = require('../controllers/restaurant')
const isAuth = require('../middleware/is-auth')
const {body} = require('express-validator')

router.post('/getRestaurants',isAuth,[
    body('lat')
    .isNumeric(),
    body('lng')
    .isNumeric(),
],
restaurantController.getRestaurants)

router.get('/transactions',isAuth,
restaurantController.getTransactions)


module.exports = router