const path = require('path');

const express = require('express');

const loginRoutes = require('../controllers/auth');

const router = express.Router();

router.get('/login', loginRoutes.login);



module.exports = router;