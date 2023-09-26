const router = require("express").Router();
const authJWT = require("../helper/authJWT");

const  {signup , loginValidation } = require("../contrallers/loginSignup");
const category = require("../contrallers/category")
const products = require("../contrallers/products")
const cart = require("../contrallers/cart")

router.post("/signup",signup);
router.post("/login",loginValidation);

router.post("/category/add", authJWT, category.addCategory);
router.get("/category/fetch", authJWT, category.fetchCategory);

router.post("/product/add", authJWT, products.addProduct);
router.post("/fetchByCategory", authJWT, products.fetchProductsByCategory);
router.get("/product/fetchProductsByPriceRange", authJWT, products.fetchProductsByPriceRange);
router.get("/product/fetchproducts", authJWT, products.fetchProducts)

router.post("/cart/addcart", authJWT, cart.addCart);
router.post("/cart/addcartitem", authJWT, cart.addCartItem);
router.post("/cart/fetchcartitem", authJWT, cart.fetchCartItem);
router.post("/cart/fetchCardByUserId", authJWT, cart.fetchCartById);
router.post("/removeCartItem", authJWT, cart.removeCartItem);

module.exports = router;