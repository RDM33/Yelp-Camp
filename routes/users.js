const express = require('express');	
const router = express.Router();	
const passport = require('passport');	
const catchAsync = require('../utils/catchAsync');	
const User = require('../models/users');	
const users = require('../controllers/users');
// ************************************************

// ************************************************
router.route('/register')
    .get(users.renderRegister) // ***** Register page (Страница регистрации) *****
    .post(catchAsync(users.register)) // ***** Saving a registered user (Сохранение зарегистрированного пользователя) *****

router.route('/login')
    .get(users.renderLogin) // ***** Login page (Страница входа) *****
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login) // ***** Verify a logged in user (Проверка войденного пользователя) *****

// ***** Logout (Выход) *****
router.get('/logout', users.logout)


module.exports = router