const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts= (req, res, next) => {
  Product.fetchAll()
    .then(([rows,fieldData])=>{
      res.render('shop/products-list',{
        docProducts: rows,
        pageTitle:'Dynamic Shop',
        path:'/products',
        });
      })
    .catch(err=>{console.log(err)}); 
}  

exports.getProduct = (req,res,next) => {
       const prodId = req.params.productId;
       Product.findById(prodId)
       .then(([rows,fieldData])=>{
        res.render('shop/product-detail',{
          product: rows[0],
          pageTitle: rows[0].title,
          path:'/products'
        });
       })
       .catch(err=>{console.log(err)});
}

exports.getIndex = (req,res,next) =>{
        Product.fetchAll()
        .then(([rows,fieldData])=>{
          res.render('shop/index',{
            docProducts: rows,
             pageTitle:'All Products',
             path:'/',
         });
        })
        .catch(err=>console.log(err));          
};


exports.getCart = (req,res,next) =>{
         Cart.getCart(cart=>{
           Product.fetchAll(products=>{
            const cartProduct = [];
            if(cart)
             for(product of products){
               const data = cart.products.find(p=>p.productId === product.id);
                if(data){
                  cartProduct.push({productData:product,productQty:data.qty});
                }
               }
             res.render('shop/cart',{
               path:'/cart',
               pageTitle:'Your Cart',
              cartProducts:cartProduct
             });
           });
       });}

       exports.postCartDeleteProduct=(req,res,next)=>{
         const prodId = req.body.productId;
         Product.findById(prodId,product=>{
           console.log(product);
           Cart.deleteProduct(prodId,product.price);
           res.redirect('/cart');
         });
        };
       
      exports.postCart = (req,res,next) => {
          const prodId = req.body.productId;
          Product.findById(prodId, (product)=>{
            Cart.addProduct(prodId,product.price);
          });
          
          res.redirect('/cart');
        };

 exports.getCheckout = (req,res,next) =>{
          res.render('shop/checkout',{
            path:'/checkout',
            pageTitle:'Checkout'
          });
      };


      
      exports.getOrder = (req,res,next) =>{
        res.render('shop/order',{
          path:'/order',
          pageTitle:'Your Order'
        });
    };