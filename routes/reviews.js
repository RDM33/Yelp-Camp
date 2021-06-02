const express = require('express')
const router = express.Router({ mergeParams: true })
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

const Campground = require('../models/campground')
const Review = require('../models/review')

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

const reviews = require('../controllers/reviews')


// ***** Creating and Saving a review (in DB too) (Создание и сохранение отзыва (в БД тоже))
router.post('/', isLoggedIn ,validateReview, catchAsync(reviews.createReview))

// ***** Deleting a review (Удаление отзыва) *****
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router