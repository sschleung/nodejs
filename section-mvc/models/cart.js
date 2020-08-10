const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const pathForSave = path.join(rootDir,'data','cart.json');


module.exports = class Cart{
    static addProduct(id , productPrice){
    
        fs.readFile(pathForSave,(err,content) =>{
            let cart = {products:[], totalPrice:0};
            if(!err){
                cart = JSON.parse(content);
            }
        const existingProductIndex = cart.products.findIndex(p => p.productId ===id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        if(existingProduct){
            updatedProduct = {...existingProduct};
            updatedProduct.qty += 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        }
        else{
            updatedProduct = {productId: id, qty:1};
            cart.products = [...cart.products,updatedProduct];
        }
        cart.totalPrice += +productPrice;

        fs.writeFile(pathForSave,JSON.stringify(cart),err=>{
            if(err)
            console.log(err);
        });    
    });
    }

    static deleteProduct(id,productPrice) {
        fs.readFile(pathForSave,(err,content)=>{
            if(err) {return;}
            const updatedCart = {...JSON.parse(content)};
            const removedProduct = updatedCart.products.find(p => p.productId===id);
            updatedCart.totalPrice -= productPrice* removedProduct.qty;
            updatedCart.products = updatedCart.products.filter(prod=>prod.id!==id);
            console.log(updatedCart);
            fs.writeFile(pathForSave,JSON.stringify(updatedCart),err=>{
                if(err)
                console.log(err);
            });
        });
    }

    static getCart(cb){
        fs.readFile(pathForSave,(err,content)=>{
         
            if(err){ cb(null);}
            else {  
                const cart = JSON.parse(content);
                cb(cart);}
        });
    }





};