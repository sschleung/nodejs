const path = require('path');

const express = require('express');

const { check } = require('express-validator/check');

const authRoutes = require('../controllers/auth');
const router = express.Router();

router.get('/login', authRoutes.getLogin);

router.post('/login', authRoutes.postLogin);

router.post('/logout', authRoutes.postLogout);

router.get('/signup', authRoutes.getSignUp);

router.post('/signup', check('email').isEmail(), authRoutes.postSignup);

router.get('/reset', authRoutes.getReset);

router.post('/reset', authRoutes.postReset);

router.get('/reset/:token', authRoutes.getNewPassword);


router.post('/new-password', authRoutes.postNewPassword);


module.exports = router;