const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts= (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/products-list',{
      docProducts: products,
      pageTitle:'Dynamic Shop',
      path:'/products',
     });
    })
  .catch(err=>{console.log(err)}); 
}  

exports.getProduct = (req,res,next) => {
       const prodId = req.params.productId;
       Product.findByPk(prodId)
       .then(product=>{
        res.render('shop/product-detail',{
          product: product,
          pageTitle:product.title,
          path:'/products'
        });
       })
       .catch(err=>{console.log(err)});

      //  Product.findAll({where:{id:prodId}}})
      //  .then(products=>{
      //   res.render('shop/product-detail',{
      //     product: products[0],
      //     pageTitle:products[0].title,
      //     path:'/products'
      //   });
      //  })
      //  .catch(err=>{console.log(err)});
}

exports.getIndex = (req,res,next) =>{
  Product.findAll()
  .then(products=>{
    res.render('shop/products-list',{
      docProducts: products,
      pageTitle:'All Products',
      path:'/'
     });
    })
  .catch(err=>{console.log(err)});         
};


exports.getCart = (req,res,next) =>{
    req.user.getCart()
    .then(cart=>{
      return cart.getProducts();
    })
    .then(products=>{
            res.render('shop/cart',{
        path:'/cart',
        pageTitle:'Your Cart',
       cartProducts:products
      });
    })
    .catch(err=>console.log(err));
  //    Cart.getCart(cart=>{
      //      Product.fetchAll(products=>{
      //       const cartProduct = [];
      //       if(cart)
      //        for(product of products){
      //          const data = cart.products.find(p=>p.productId === product.id);
      //           if(data){
      //             cartProduct.push({productData:product,productQty:data.qty});
      //           }
      //          }
      //        res.render('shop/cart',{
      //          path:'/cart',
      //          pageTitle:'Your Cart',
      //         cartProducts:cartProduct
      //        });
      //      });
      //  });
}

exports.postOrder=(req,res,next)=>{

};

       exports.postCartDeleteProduct=(req,res,next)=>{
         const prodId = req.body.productId;
          req.user.getCart()
          .then(cart=>{
            return cart.getProducts({where:{id:prodId}});
          })
          .then(products=>{
            let product = products[0];
            return product.cartItem.destroy();
          })
          .then(result=>{
            res.redirect('/cart');
          })
          .catch(err=>console.log(err));

        }
       
      exports.postCart = (req,res,next) => {
          const prodId = req.body.productId;
          let fetchCart;
          let newQuantity = 1;
          req.user.getCart()
          .then(cart=>{
            fetchCart = cart;
            return cart.getProducts({where:{id:prodId}});
          })
          .then(products=>{
            let product;
            if(products.length >0){
              product = products[0];
            }
            if(product){
              const oldQuantity = product.cartItem.quantity;
              newQuantity = oldQuantity +1;
              return product;
            }
              return Product.findByPk(prodId)
            })
            .then(product=>{
                return fetchCart.addProduct(product,{through:{quantity:newQuantity}})
            })
          .then(result=>{
            res.redirect('/cart');
          })
          .catch(err=>console.log(err));
        }

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