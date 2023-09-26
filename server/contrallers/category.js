var pool = require('../database');

module.exports.addCategory = async function(req, res) {
   try{
          pool.query(
            `INSERT INTO Categories(category_name) VALUES ('${req.body.category_name}') ;`,
            (err, result) => {
              if (err) {
                throw err;
              }else{
                return res.status(200).send({
                    msg: 'category added successfully'
                    });
              }
             
            }
          );
      
   }catch(err){ 
       res.send({responseCode : 500 , err : err.message});
   }
   
  }

  module.exports.fetchCategory = async function(req, res) {
    var body = req.body;
    // var json_=JSON.stringify(body);//You use JSON.stringify(object) to convert a JavaScript object into a JSON string
    // var jsonobj =(JSON.parse(json_));// You use JSON.parse(jsonString) to convert a JSON string into a JavaScript object.
   try{
          pool.query(
            `SELECT * FROM Categories;`,
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