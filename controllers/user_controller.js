const { response } = require("express");
const User = require("../models/user");
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"User Profile",
            profile_user: user,
        });
    })
    // return res.render('user_profile',{
    //     title: 'Users'
    // })
}

//update the profile 
module.exports.update = async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         req.flash('success','Profile Updated');

    //         return res.redirect('back');
    //     });
    // }else{
        
    //     return res.status(401).send('Unauthorized');
    // }

    // AFTER ADDING AVATAR HERE 
    if(req.user.id==req.params.id){
        
        try{
            let user=await User.findById(req.params.id);
            //used here to decode the params send in form as now they are noot simple one 
        //but encrypted params 
      

            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('**** multerr errorr', err);
                }
                // console.log('hhh');
                user.name=req.body.name;
                user.email=req.body.email;
                //if file is needed to be change then only do it 
                console.log(req.file);
                if(req.file){

                    //to check if user avatar is already present or not 

                    if(user.avatar){
                        try{
                            //to rempove previous avatar file from the path
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }catch(err){

                        }
                    }
                    //this is saving the path of uploaded file into the avatar fiield in the user
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error',err);
        return res.status(401).send('Unauthorized');

    }

}

//render the sign in page 
module.exports.signUp=function(req, res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    req.flash('success','Signed Up succesfully');

    return res.render('user_sign_up',{
        title: 'codiel | sign Up page'
    });
};


//render the sign up page 
module.exports.signIn=function(req, res){

    if(req.isAuthenticated()){
        req.flash('success','Welcome ${req.user.name}');
        return res.redirect('/users/profile');
     }else{
        req.flash('error','unabel to sign in');

     }

    

    return res.render('user_sign_in',{
        title: 'codiel | sign in page'
    });
};


//get the sign up data
module.exports.create=function(req,res){
    //todo later
}

//get the sign up data
module.exports.createSession=function(req,res){
    //todo later
    console.log('in createSession');
    req.flash('success','Logged in Succesfully');
    return res.redirect('/');
}

//creating controller for create after signup
module.exports.create=function(req,res){

    //go back if password doesnt match 
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    //finding if user is already present or not 

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding the user');
            return;
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while sighning up');
                    return;
                }

                return res.redirect('/users/sign-in');

            })
        }else{
            return res.redirect('back');
        }
    })
}

//for sign out 
module.exports.destroySession= function(req,res){
    req.logout();
    req.flash('success','You have logged out ');

    return res.redirect('/');
}


