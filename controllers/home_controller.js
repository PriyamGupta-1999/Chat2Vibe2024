const Post = require("../models/post");
const User = require("../models/user");
//async function for the process to accompolish 

module.exports.home= async function(req,res){
    //await to mention complete this and then go ahead 
    try{
    let posts= await Post.find({})
    .sort('-created')//sort items with the time they are created
    .populate('user')
    .populate({
        path: 'Comments',
        populate: {
            path: 'user'
        }
    });
    

        //query to find all the users 
    let users= await User.find({});
        
    return res.render('home', {
        title: "Codiel | Home",
        posts: posts,
        all_users: users
    })
    }catch(err){
        console.log('Error',err);
    } 
        
    
}

