const { response } = require('express');
const Post=require('../../../models/post')
const Comment=require('../../../models/post');

module.exports.index= async function(req,res){
    let posts= await Post.find({})
    .sort('-created')//sort items with the time they are created
    .populate('user')
    .populate({
        path: 'Comments',
        populate: {
            path: 'user'
        }
    });
    return res.json(200,{
        message: "List of posts ",
        post: posts
    })
}

//remove all the parts that are of authentication.

module.exports.destroy = async function(req,res){
    // console.log('11')
    try{
        let post= await Post.findById(req.params.id);
       
    
    //.id is used instead of ._id -> used to convert object to string
    if(post.user==req.user.id){
            post.remove();
            //function given by mongo to delete many comments with paraameter id 
            await Comment.deleteMany({post: req.params.id});
            // req.flash('success','Post destroyed');
            
            //xhr request tracker 
            
            return res.json(200,{
                message: "Post and associated comments deleted succesfilly "
            });
        }else{
            return res.json(401,{
                message: "You cant delete this post "
            })
        }
    }catch(err){
       return response.json(500,{
           message: "internal server error"
       })

       
    }
}

