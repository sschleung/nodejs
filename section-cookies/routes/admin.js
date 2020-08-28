const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const checkAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', checkAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', checkAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', checkAuth, adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
