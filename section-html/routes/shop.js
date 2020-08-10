const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('shopJS',adminData.product);
  const product = adminData.product;
  res.render('shop',{
    docProducts: product,
     pageTitle:'Dynamic Shop',
     path:'/',
     hasProduct: product.length>0,
    activeShop:true,
  productCSS: true,
 });
});

module.exports = router;
 