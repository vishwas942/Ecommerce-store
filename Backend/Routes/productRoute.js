const express = require('express');
const { requireSignin, isAdmin } = require('../Middleware/authMiddleware');
const {createProductController, getAllProductController, braintreeTokenController,brainTreePaymentController,productCategoryController, getSingleProductController,productFiltersController, getProductImageController, deleteProductController, updateProductController, productCountController, productListController, searchProductController, realtedProductController} = require('../Controllers/productcontroller')
const router = express.Router();
const formidable = require('express-formidable')

router.post("/create-product", requireSignin, isAdmin, formidable(), createProductController )

router.get('/get-products', getAllProductController )

router.get('/single-product/:slug', getSingleProductController )

router.get('/product-Image/:pid', getProductImageController )

router.delete('/delete-product/:pid', requireSignin, isAdmin, deleteProductController )

router.put('/update-product/:pid', requireSignin, isAdmin, formidable(), updateProductController )

router.post('/product-filter', productFiltersController)

router.get('/product-count', productCountController)

router.get('/product-list/:page', productListController)

router.get('/search/:keyword', searchProductController)

router.get('/related-product/:pid/:cid', realtedProductController)

router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignin, brainTreePaymentController);



module.exports = router;