const Cart = require('./cart');

const db = require('../util/database');

module.exports = class Product {
    constructor(id,title,imageUrl,description,price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        return db.execute('insert into products (title,price,description,imageUrl) values (?, ?, ?, ?)',
        [this.title,this.price,this.description,this.imageUrl]);
    }

    static deleteProduct(id){

    }
 
    static fetchAll(){
        return db.execute('select * from products');
    }

    static findById(id){
            return db.execute('select * from products where products.id = ?',[id]);
    }

};

















// Code with file system(fs)


// const fs = require('fs');
// const path = require('path');

// const rootDir = require('../util/path');
// const pathForSave = path.join(rootDir,'data','products.json');

// const Cart = require('./cart');

// const getProductFromFile = cb =>{
//     fs.readFile(pathForSave,(err,content)=>{
//         if(err){cb([]);} 
//         else {cb(JSON.parse(content));}
//     });
// }

// module.exports = class Product {
//     constructor(id,title,imageUrl,description,price){
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }

//     save(){
//         getProductFromFile(products =>{
            
//             if(this.id){
//                 const existingProductIndex = products.findIndex(p => p.id === this.id);
//                 const updatedProducts = [...products];
//                 updatedProducts[existingProductIndex] = this;
//                 fs.writeFile(pathForSave,JSON.stringify(updatedProducts),(err)=>{
//                     console.log(err);
//             });}

//             else{
//                 this.id = Math.random().toString();
//                 products.push(this);
//                 fs.writeFile(pathForSave,JSON.stringify(products),(err)=>{
//                 console.log(err);
//             });}
//         }); 
//     }

//     static deleteProduct(id){
//         getProductFromFile(products =>{
//             const product = products.find(p=>p.id===id);
//             const updatedProducts = products.filter(p => p.id !== id);
//             fs.writeFile(pathForSave,JSON.stringify(updatedProducts),
//             (err)=>{
//                 if(!err){
//                     Cart.deleteProduct(id,product.price);
//                 } 
//             });
        
//         });
//     };

//     static fetchAll(cb){
//         getProductFromFile(cb);
//     };
 
//     static findById(id,cb){
//         getProductFromFile(products =>{
//             const product = products.find(p=>p.id===id)
//              cb(product);
            
//         });
//     } ;   

// };