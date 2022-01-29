const express = require('express');
const router = express.Router();

const {getNewsById, getProduct, photo, updateProduct, getAllNewses, getAllUniqueCategories,
     createNews, getNewsByCategoryId, deleteNews, getCategoryById, getNewsByNewsId} = require('../controller/news');
const {getUserById, getUserForPhoto} = require('../controller/admin/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controller/admin/auth');

//All of params
router.param("userId",getUserById);
router.param("newsId",getNewsById);
router.param("categoryId",getCategoryById);

//All of actual routes
//create routes
router.post('/news/create/:userId',isSignedIn, isAuthenticated,  createNews);

//read routes
router.get('/newsContent/:newsId',getNewsByNewsId);
router.get('/product/photo/:newsId',photo);
router.get('/news/:categoryId',getNewsByCategoryId);


//delete route
router.delete('/news/:newsId/:userId',isSignedIn, isAuthenticated, deleteNews);

//update route
router.put('/news/:newsId/:userId',isSignedIn, isAuthenticated, updateProduct);


//listing route
router.get('/newses/general',getAllNewses);
router.get('/newses',getAllNewses);


router.get('/products/categories',getAllUniqueCategories);






module.exports = router;

