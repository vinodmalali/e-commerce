var pool = require('../database');
// const {signupValidation , loginValidation } = require('../controllers/validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenKey = process.env.TOKEN_KEY;
const {encrypt, decrypt} = require("../helper/AES");

module.exports = {
    signup : (req, res, next) => {
       // console.log(req.body)
        
        pool.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${pool.escape(
        req.body.emailId
        )});`,
        (err, result) => {
        if (result.length) {
        return res.status(409).send({
        msg: 'User already exist with same email ID'
        });
        } else {
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
           
        pool.query(
            `INSERT INTO users (username, email, hashed_password, address, phone) VALUES (${pool.escape(req.body.username)}, ${pool.escape(req.body.emailId)}, ${pool.escape(hash)}, ${pool.escape(req.body.address)}, ${pool.escape(req.body.phone)})`,
            (err, result) => {
              if (err) {
                throw err;
              }
              return res.status(201).send({
                msg: 'The user has been registered with us!',
              });
            }
          );
}
}
);
},

    loginValidation : (req, res, next) => {
    pool.query(
    `SELECT * FROM users WHERE email = ${pool.escape(req.body.username)};`,
    (err, result) => {
    // user does not exists
    if (err) {
    throw err;
   
    }
    else if (!result.length) {
    return res.status(400).send({
    msg: 'Email or password is incorrect!'
    });
    }
    
    bcrypt.compare(
        req.body.password,

        result[0]['hashed_password'],
        
        (bErr, bResult) => {
        // wrong password
        if (bErr) {
        throw bErr;
        
        }
        else if (bResult) {
        const token = jwt.sign({user_Id:result[0].user_id,email:result[0].email},tokenKey,{ expiresIn: '24h' });
        pool.query(
        `UPDATE users SET last_logged_in = now() WHERE user_id = '${result[0].user_id}'`
        );
        
        //setting the userdetails
        var userDetails = {};
        // userDetails.user_Id = encrypt(result[0].user_Id);
        userDetails.user_id = result[0].user_id;
        userDetails.username = result[0].username;
        userDetails.email = result[0].email;
        userDetails.loginTime = result[0].loginTime;

        return res.status(200).send({
        msg: 'Logged in!',
        token,
        user: userDetails
        
        });
        }
        else{
            return res.status(400).send({
                msg: 'Username or password is incorrect!'
                });
        }
        
        }
        );
        }
        );
        }
};


 

