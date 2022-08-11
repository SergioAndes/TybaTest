const express = require('express');
const router = express.Router()
const authController = require('../controllers/auth')
const {body,check} = require('express-validator')
const User= require('../models/user')

//Singup Validation rules
const signupValidate = [
    check('username').custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the username'),
    check('password').isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .matches('[0-9]').withMessage('Password Must Contain a Number')
    .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')];



router.post('/signup',signupValidate,authController.signup)

router.post('/login',authController.login)

router.get('/logout',authController.logout)

module.exports = router