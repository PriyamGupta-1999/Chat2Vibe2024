const { kMaxLength } = require('buffer');
const express=require('express');
const { append } = require('vary');
const router =express.Router();


const homecontroller=require('../controllers/home_controller');
console.log('ruter loaded');

router.get('/',homecontroller.home);
router.use('/users',require('./users'));

router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));

router.use('/api',require('./api'));
// router.post('/posts/create',function(req,res){
//     console.log('aaaa');
//     return res.redirect('back');
// })
module.exports=router;

