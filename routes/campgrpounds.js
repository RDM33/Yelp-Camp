const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage })
// ******************************************************

// ******************************************************
router.route('/')
    .get(catchAsync(campgrounds.index)) // ***** All camps (Bсе кэмпы) *****
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground)) // ***** Saving a new camp in DB(Сохранение нового кэмпа в БД) *****
    
// ***** Creatind a new camp (Создание нового кэмпа) *****
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground)) // ***** Finding one camp (Нахождение одного кэмпа) *****
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground)) // ***** Submitting camp editing (Подтверждение редактирования кэмпа) *****
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground)) // ***** Deliting a camp (Удаление кэмпа) *****

// ***** Creatind a new camp (Создание нового кэмпа) *****
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

// ***** Editing camp (Редактиование кэмпа) *****
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router