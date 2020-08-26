const path = require('path');

const express = require('express');

const authRoutes = require('../controllers/auth');

const router = express.Router();

router.get('/login', authRoutes.getLogin);

router.post('/login', authRoutes.postLogin);

router.post('/logout', authRoutes.postLogout);

router.get('/signup', authRoutes.getSignUp);

router.post('/signup', authRoutes.postSignup);

module.exports = router;