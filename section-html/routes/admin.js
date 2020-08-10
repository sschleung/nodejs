const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const product = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product',{
    pageTitle:'Add Product',
    path:'/admin/add-product',
    activeAddProduct: true,
    formCSS:true});
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  product.push({title: req.body.title});
  res.redirect('/');
});

module.exports.routes = router;
module.exports.product = product;