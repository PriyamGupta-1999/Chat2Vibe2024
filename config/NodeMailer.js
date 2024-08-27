const nodemailer=require("nodemailer");
let ejs=require('ejs');
let path= require('path');
let transporter= nodemailer.createTransport({
    service: 'gamil',
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: {
        user: 'check2vibeofficial',
        pass: 'S@964g3939034'
    }
});

let renderTemplate= (data,relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath), //relative path is where this function is called
        data,
        function(err,template){
            if(err){
                console.log('err in redering ');
                return;
            }
            mailHtml=template;
        }
    )

    return mailHtml;
}

module.exports={
    transporter:transporter,
    renderTemplate: renderTemplate
}