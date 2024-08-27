const { model } = require('mongoose');
const Comment = require('../models/comment');
const Like = require('../models/like');
const Post = require('../models/post');

module.exports.toggleLike= async function(req,res){

//     console.log('jj');
//    return  res.redirect('/');
   
    try{
        //likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted= false;

        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id).populate('likes');
        }else{
            likeable=await Comment.findById(req.query.id).populate('likes');
        }

        //check if like is already exist 

        console.log('data ',req.query.id,req.query.type)
        let existingLike= await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        //if a like already exist then delete it, else make a new like 
        console.log('*************',existingLike);
        if(existingLike){
            console.log('hh');
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted=true;
        }else{
            let newLike= await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        // return res.json(200,{
        //     message: "request succesfull",
        //     data: {
        //         deleted: deleted
        //     }
        // })

        res.redirect('/');

    }catch(err){
        console.log('ERROR', err);
        
    }
}