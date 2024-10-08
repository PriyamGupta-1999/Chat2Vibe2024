const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const env=require('../../../config/environment');

module.exports.createSession=async function(req,res){
    try{
        let user= await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: "Invalid Password"
            });
        }
            return res.json(200, {
                message: 'Sign in succesfull',
                data: {
                    //convert user into token using codiel encryptionn
                    token :jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn: '100000'})
                }
            })
        
    }catch(err){
        console.log('***', err);
        return res.json(500,{
            message: "internal server error"
        })
    }
   
}