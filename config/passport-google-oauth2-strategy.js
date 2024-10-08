const passport=require('passport');

const googleStrategy=require('passport-google-oauth').OAuth2Strategy;

const crypto= require('crypto');

const User= require('../models/user');

const env=require('./environment');

//tell passport to use a new strategy for google log in 
passport.use(new googleStrategy({
    clientID:env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL:env.google_call_back_url, //matched from google credenetials 

}, 
    function(accessToken,refreshToken,profile, done){
        //profile will contain user info 
        //we will be getting array of emails 
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy',err);
                return;
            }

            console.log(profile);

            if(user){
                // if found set thsi suser as request.user 
                return done(null,user);
            }else{
                User.create({

                    //if not create the user 
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){
                        console.log('error in creating user google strategy passport ',err);
                        return done(null,user);
                    }
                })
            }
        })
    }
))

module.exports=passport;