var pool = require('../database');

module.exports.addCart = async function(req,res){
    try{
        pool.query(
            `INSERT INTO Cart(user_id) values('${req.body.user_id}');`,
            (err, result) => {
                if (err) {
                  throw err;
                }
                
                return res.status(201).send({
                  msg: 'user cart added successfully'
                  });
              }
        )

    }catch{
        res.send({responseCode : 500 , err : err.message});
    }
}

module.exports.addCartItem = async function(req,res){
    try{
        pool.query(
            `INSERT INTO CartItems (cart_id , product_id , total_price ) values(
                '${req.body.cart_id}',
                '${req.body.product_id}',
                '${req.body.total_price}');`,
            (err, result) => {
                if (err) {
                  throw err;
                }
                
                return res.status(201).send({
                  msg: 'Item added successfully to the cart'
                  });
              }
        )

    }catch{
        res.send({responseCode : 500 , err : err.message});
    }
}

module.exports.fetchCartItem = async function(req,res){
    try{
        pool.query(
            `SELECT c.cart_item_id,p.product_name,p.price,p.stock_quantity,p.image,c.quantity,c.total_price FROM products p LEFT JOIN cartitems c USING(product_id) WHERE c.cart_id=(SELECT cart_id FROM Cart WHERE user_id=${req.body.user_id});`,
            (err, result) => {
                if (err) {
                  throw err;
                }
                return res.status(201).send({ result });
              }
        )

    }catch{
        res.send({responseCode : 500 , err : err.message});
    }
}

module.exports.fetchCartById = async function(req,res){
    try{
        pool.query(
            `SELECT cart_id FROM Cart WHERE user_id=${req.body.user_id};`,
            (err, result) => {
                if (err) {
                  throw err;
                }
                return res.status(201).send({ result });
              }
        )

    }catch{
        res.send({responseCode : 500 , err : err.message});
    }
}

module.exports.removeCartItem = async function(req,res){
    try{
        pool.query(
            `DELETE FROM cartitems WHERE cart_item_id=${req.body.cart_item_id};`,
            (err, result) => {
                if (err) {
                  throw err;
                }
                return res.status(201).send({
                    msg: 'Item removed successfully from the cart'
                    });
              }
        )

    }catch{
        res.send({responseCode : 500 , err : err.message});
    }
}