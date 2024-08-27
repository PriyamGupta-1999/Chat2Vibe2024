const passport= require('passport');

const LocalStragetgy = require('passport-local').Strategy;

const User=require('../models/user');



passport.use(new LocalStragetgy({
    usernameField: 'email',
    //add this to pass the request 
    passReqToCallback:true
},
    function(req,email,password,done){
        console.log(email);
        User.findOne({email: email}, function(err,user){
            if(err){
                req.flash('error',err);
                console.log('error in finding user --> passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                req.flash('error','Invalid Username/Password');

                return done(null,false);
            }

            return done(null,user);
        });
    }
));



//serializing the user to decide which key is to be kept in the cookies 
//used to encscypt the key 
passport.serializeUser(function(user,done){
    done(null, user.id);
})

//deserializing the user from the key in the cookies 
//descryptinmg the enscrypted id for server uses 
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('error in fiding user --> passport ');
            return done(err);
        }

        return done(null, user);
    })
})


//middleware for checking the authentication putpose
//check if user is authenticated 
passport.checkAuthentication = function(req,res,next){
    console.log('checkAuthentication ',req.user);
    // if user is signed in, then pass on the reqwuest to the next function(controllers action)
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error','Not valid');
        
    }
    //if the user is not signedd in 
    return res.redirect('/users/sign-in');
}


//used to set the authenticated user in locals for the views 
passport.setAuthenticatedUser= function(req,res,next){
    console.log('setAuthenticatedUser');

    if(req.isAuthenticated()){
        //req .user cotains the current signed in user from the session cookie and we are just sending this to locals for the views
        res.locals.user = req.user;
    }
    next();//middleware so we need to transger it 
}

module.exports=passport;
