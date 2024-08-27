//routes for user 

const express=require('express');
const passport = require('passport');

const router=express.Router();

//connecting to controller of users 
const userControllers=require('../controllers/user_controller');

//check authentication is as a middleware to see if user is authenticated or not before proceeding 
router.get('/profile/:id',passport.checkAuthentication,userControllers.profile);
router.post('/update/:id',passport.checkAuthentication,userControllers.update);



router.get('/sign-up',userControllers.signUp);

router.get('/sign-in',userControllers.signIn);

router.post('/create',userControllers.create);


// use passport as a middleware to authenticate 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userControllers.createSession);



router.get('/sign-out',userControllers.destroySession);

//not call bakc but google wil recongines by this url
//scope will mention all the info we need  
router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: 'users/sign-in'}), userControllers.createSession);



module.exports=router;




//commandd for user posts

