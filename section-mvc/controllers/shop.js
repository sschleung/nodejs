const Product = require('../models/product');
const Cart = require('../models/cart');

      exports.getProducts= (req, res, next) => {
        Product.fetchAll(products=>{
          res.render('shop/products-list',{
            docProducts: products,
             pageTitle:'Dynamic Shop',
             path:'/products',
       
            
         });
        });
     
      } ; 

      exports.getProduct = (req,res,next) => {
       const prodId = req.params.productId;
       Product.findById(prodId, product =>{
        res.render('shop/product-detail',{
          product: product,
          pageTitle: product.title,
          path:'/products'
        });
       });
      };

      exports.getIndex = (req,res,next) =>{
        Product.fetchAll(products=>{
          res.render('shop/index',{
            docProducts: products,
             pageTitle:'All Products',
             path:'/',
        
       
         });
        });
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