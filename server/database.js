const {createPool} = require("mysql");

const pool = createPool({
    port : 3307,
    host: "localhost",
    user: "root",
    password: "sakha@123",
    database: "ecommercedb"
    
});

module.exports  =  
    pool;