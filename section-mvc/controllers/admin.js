const Product = require('../models/product');



exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product',{
      pageTitle:'Add Product',
      path:'/admin/add-product',
      editing: false
       });
};



      
exports.postAddProductPage = (req, res, next) => {
        const product = new Product(
          null,
          req.body.title,
          req.body.imageUrl,
          req.body.description,
          req.body.price);
        product.save();
        res.redirect('/');
};


      
exports.getEditProductPage = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode)
  return res.redirect('/');

  const prodId = req.params.productId;
  Product.findById(prodId,(product)=>{
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product',{
    pageTitle:'Edit Product',
    path:'/admin/edit-product',
    editing:editMode,
    product:product
    });
  });
};
    
exports.getProducts = (req, res, next) => {
        Product.fetchAll(products =>{
          res.render('admin/products',{
            docProducts: products,
            path: '/admin/products',
            pageTitle: 'Admin Products'
          });
        });
};

exports.postEditProduct=(req,res,next)=>{
  const updatedProduct = new Product(
    req.body.productId,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price)
    console.log(req.body.productId);
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.postDeleteProduct=(req,res,next)=>{
  Product.deleteProduct(req.body.productId);
  res.redirect('/admin/products');
};