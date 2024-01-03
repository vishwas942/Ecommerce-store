const express = require('express');
const { requireSignin, isAdmin } = require('../Middleware/authMiddleware');
const { createCategoryController, updateCategoryController, getAllCategoriesController, singleCategoryController, deleteCategoryController } = require('../Controllers/categorycontroller');
const router = express.Router();


router.post("/create-category", requireSignin, isAdmin, createCategoryController)

router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController )

router.get('/get-categories', getAllCategoriesController)

router.get('/single-category/:slug', requireSignin, isAdmin, singleCategoryController )

router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoryController)


module.exports = router;