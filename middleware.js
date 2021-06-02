const { campgroundSchema, reviewSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campground')
const Review = require('./models/review')


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be Signed In!')
        return res.redirect('/login')
    }
    next()
}

// ***** Middleware for errors(Промежуточная обработка ошибок) *****
// Validating the entered values with "Joi" scheme (Проверка введенных значений с помощью схемы "Joi")
module.exports.validateCampground = (req, res, next) => { 
    const { error } = campgroundSchema.validate(req.body)
    if (error) { // If there is an error then... (Если есть ошибка то ...)
        // Mapping over the error details to make a single string message
        // Собираем инф об ошибках, чтобы сделать одно строковое сообщение
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400) // Pass error "msg" and "code" to a "throw new ExpressError"
    }                                    // Передаем сообщение об ошибке и ее код в "throw new ExpressError" 
    else {
        next()
    }
}
// ***** Middware for is author a user or not (Обработка автор ли пользователь) *****
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

// ***** Middware for is author of review a user or not (Обработка автор ли пользователь) *****
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

// Validating the entered values with "Joi" scheme in "Review" (Проверка введенных значений с помощью схемы "Joi" в "Отзыве")
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400) 
    }                                     
    else {
        next()
    }
}