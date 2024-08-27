const Post=require('../../../models/post')
module.exports.index= async function(req,res){
    
    return res.json(200,{
        message: "List of posts ",
        posts: []
    })
}

