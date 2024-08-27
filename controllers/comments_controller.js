const { redirect } = require('express/lib/response');
const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailer/comments_mailer');
module.exports.create = async function (req, res) {
    //here we need to make sure only authenticated user is allowed to add comments to the post

    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            });


            // adding comment to array of posts 
            // post.Comments.push(comment);
            post.Comments.push(comment);
            post.save();//save the comments to the post 

            comment = await comment.populate('user','name email');
            commentsMailer.newComment(comment);
            req.flash('success', 'Comment created');
            res.redirect('/');//redirect it to save it 
        }
    } catch (err) {
        console.log('ERROR', err);
        req.flash('error', 'Comment cant be created');

    }

}


module.exports.destroy = async function (req, res) {

    try {
        let comment = await Comment.findById(req.params.id);

        //.id is used instead of ._id -> used to convert object to string


        if (comment.user == req.user.id) {
            let post_id = comment.post;
            comment.remove();
            //function given by mongo to delete many comments with paraameter id 


            let post = await Post.findByIdAndUpdate(post_id, { $pull: { Comments: req.params.id } });
            req.flash('success', 'Comment destroyed');

            return res.redirect('back');

        } else {
            req.flash('error', 'You cant destroy this comment ');

            return res.redirect('back');
        }

    } catch (err) {
        console.log('Error', err);
    }


}


