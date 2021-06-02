const User = require('../models/users')


// ****** Register page (Страница регистрации) *****
module.exports.renderRegister = (req, res,) => {
    res.render('users/register')
}

// ****** Saving registered user (Сохранение зарегистрированного пользователя) *****
module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

// ****** Login page (Страница входа) *****
module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

// ****** Verify a logged in user (Проверка войденного пользователя) *****
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

// ***** Logout (Выход) *****
module.exports.logout = (req, res) => {
    req.logout()
    req.flash('success', 'Goodbye!')
    res.redirect('/campgrounds')
}

