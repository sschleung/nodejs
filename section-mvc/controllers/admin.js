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
          product.save()
          .then(()=>{
            res.redirect('/');
          })
        .catch(err=>{console.log(err)});
};


      
exports.getEditProductPage = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode)
  return res.redirect('/');

  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(([rows,fieldData])=>{
    if(!rows[0]){
      return res.redirect('/');
    }
    res.render('admin/edit-product',{
    pageTitle:'Edit Product',
    path:'/admin/edit-product',
    editing:editMode,
    product: rows[0]
    });
  })
  .catch(err=>{console.log(err)});
  
};
    
exports.getProducts = (req, res, next) => {
        Product.fetchAll()
        .then(([rows,fieldData])=>{
          res.render('admin/products',{
            docProducts: rows,
            path: '/admin/products',
            pageTitle: 'Admin Products'
          });
        })
        .catch(err=>{console.log(err)});     
}

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