const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local-strategy');
const CommentsController=require('../controllers/comments_controller');

//apply checkAuthentication, so that only signed user can only create the form 
router.post('/create',passport.checkAuthentication,CommentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,CommentsController.destroy);


module.exports=router;