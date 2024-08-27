const nodemailer=require('../config/NodeMailer');

//instead of module.exports will work 
//this will be called when comment controller will upload the  comment 
exports.newComment= (comment) => {
    console.log('inside new comment mailer ');
    nodemailer.transporter.sendMail({
        from: 'Chat2vibeofficial@gmail.com',
        to: comment.user.email,
        subject: "New Comment published",
        html :'<h1>Yup, Ypur comment is now published</h1>'
    },(err,info) => {
        if(err){
            console.log('error in sending mail',err)
            return;
        }
        console.log('Message sent', info);
    })
}