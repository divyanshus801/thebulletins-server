const express = require('express');
const router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory,removeCategory} = require('../controller/category');
const {isSignedIn, isAuthenticated } = require('../controller/admin/auth');
const {getUserById} = require('../controller/admin/user');

//params
router.param('userId',getUserById);
router.param('categoryId',getCategoryById);

//actual routers goes here
//Create routes
router.post('/category/create/:userId',isSignedIn, isAuthenticated, createCategory);

//Read routes
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategory);

//update routes
router.put('/category/:categoryId/:userId',isSignedIn, isAuthenticated, updateCategory);

//delete routes
router.delete("/category/:categoryId/:userId",isSignedIn, isAuthenticated, removeCategory);

module.exports = router;