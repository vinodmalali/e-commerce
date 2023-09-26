var pool = require('../database');

module.exports.addProduct = async function(req, res) {
   try{
          pool.query(
            `INSERT INTO products(category_id,product_name,description,price,stock_quantity,image) VALUES (
                '${req.body.category_id}',
                '${req.body.product_name}',
                '${req.body.description}',
                '${req.body.price}',
                '${req.body.stock_quantity}',
                '${req.body.image}') ;`,
            (err, result) => {
              if (err) {
                throw err;
              }
              
              return res.status(200).send({
                msg: 'Product added successfully'
                });
            }
          );
      
   }catch(err){ 
       res.send({responseCode : 500 , err : err.message});
   }
  }

 
  module.exports.fetchProductsByCategory = async function(req, res) {
    var body = req.body;
    // console.log('bodyyyyyyyyyyyyy', body);
    // var json_=JSON.stringify(body);//You use JSON.stringify(object) to convert a JavaScript object into a JSON string
    // var jsonobj =(JSON.parse(json_));// You use JSON.parse(jsonString) to convert a JSON string into a JavaScript object.
    const categoryId = typeof req.body.category_id === 'string' 
    ? parseInt(req.body.category_id) 
    : req.body.category_id;

    // console.log(categoryId);

   try{
          pool.query(
            `SELECT * FROM products WHERE category_id = ${categoryId};`,
            (err, result) => {
              if (err) {
                throw err;
              }
              return res.status(201).send({ result });
            }
          );
      
   }catch(err){ 
       res.send({responseCode : 500 , err : err.message});
   }
   
  }

module.exports.fetchProductsByPriceRange = async function(req, res) {
  const categoryId = req.body.category_id;
  const minPrice = req.body.minPrice || 0;  
  const maxPrice = req.body.maxPrice || Number.MAX_SAFE_INTEGER; 

  try {
      pool.query(
          `SELECT * FROM products WHERE category_id = ${categoryId} AND price BETWEEN ${minPrice} AND ${maxPrice};`,
          (err, result) => {
              if (err) {
                  throw err;
              }
              return res.status(201).send({ result });
          }
      );
  } catch (err) {
      res.send({responseCode: 500, err: err.message});
  }
}

module.exports.fetchProducts = async function(req, res) {
  var body = req.body;
  // var json_=JSON.stringify(body);//You use JSON.stringify(object) to convert a JavaScript object into a JSON string
  // var jsonobj =(JSON.parse(json_));// You use JSON.parse(jsonString) to convert a JSON string into a JavaScript object.
 try{
        pool.query(
          `SELECT * FROM products;`,
          (err, result) => {
            if (err) {
              throw err;
            }
            return res.status(201).send({ result });
          }
        );
    
 }catch(err){ 
     res.send({responseCode : 500 , err : err.message});
 }
 
}

