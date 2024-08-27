const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local-strategy');
const postController=require('../controllers/post_controller');

//apply checkAuthentication, so that only signed user can only create the form 
router.post('/create',passport.checkAuthentication,postController.create);

router.get('/destroy/:id', passport.checkAuthentication,postController.destroy);
module.exports=router;