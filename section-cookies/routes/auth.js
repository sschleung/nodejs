const path = require('path');

const express = require('express');

const loginRoutes = require('../controllers/auth');

const router = express.Router();

router.get('/login', loginRoutes.getLogin);

router.post('/login', loginRoutes.postLogin);

router.post('/logout', loginRoutes.postLogout);

module.exports = router;