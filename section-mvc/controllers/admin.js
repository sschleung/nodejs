const Product = require('../models/product');



exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product',{
      pageTitle:'Add Product',
      path:'/admin/add-product',
      editing: false
       });
};



      
exports.postAddProductPage = (req, res, next) => {
        req.user.createProduct({
          title:req.body.title,
          imageUrl:req.body.imageUrl,
          description:req.body.description,
          price:req.body.price,
          
        })
          .then(result=>{
            res.redirect('/');
          })
        .catch(err=>{console.log(err)});       
}


      
exports.getEditProductPage = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode)
  return res.redirect('/');


  const prodId = req.params.productId;
  req.user.getProducts({where:{id:prodId}})  
  .then(products=>{  
    if(!products[0]){
      return res.redirect('/');
    }
    res.render('admin/edit-product',{
    pageTitle:'Edit Product',
    path:'/admin/edit-product',
    editing:editMode,
    product: products[0]
    });
  })
  .catch(err=>{console.log(err)});
};
    
exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('admin/products',{
      docProducts: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
    })
  .catch(err=>{console.log(err)});    
}

exports.postEditProduct=(req,res,next)=>{
  Product.findByPk(req.body.productId)
  .then(product=>{
    product.title = req.body.title;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.price = req.body.price;
    return product.save();
  })
  .then(result=>
    res.redirect('/admin/products')
  )
  .catch(err=>console.log(err));
}

exports.postDeleteProduct=(req,res,next)=>{
  Product.findByPk(req.body.productId)
  .then(product=>{
  return product.destroy();
  })
 .then(result=>{
   console.log('Delete product');
   res.redirect('/admin/products');
 })
  .catch(err=>console.log(err));
}