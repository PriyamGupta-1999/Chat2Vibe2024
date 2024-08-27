const express=require('express');
const passport = require('../config/passport-local-strategy');
const router=express.Router();

// router.get('/addLike',passport.checkAuthentication,);
const likeController= require('../controllers/like_controller');
// console.log('iii');
// likeController.toggleLike
router.get('/toggle',likeController.toggleLike);
   


module.exports=router;