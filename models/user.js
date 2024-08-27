const mongoose=require('mongoose');
const { stringify } = require('querystring');
// import a multer here so that use it specific to avatar 
const multer=require('multer');
const path=require('path');//used to convert below string to path using path 

//path where image is going to save 
const AVATAR_PATH=path.join('/uploads/users/avatar');

const userSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        
    },

    name: {
        type: String,
        required: true,
        
    },

    //adding avatar 
    avatar: {
        type: String 
    },
},
{
    timestamps: true,
});


//creating multer stroage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));//need to be changd from documentation we got 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })


 //creating static methods to use them in controllerr 
 //single is to store only one image only in the storage using multerr 
 userSchema.statics.uploadedAvatar=multer({storage: storage}).single('avatar');

//declare avatar path for fututre usee 
userSchema.statics.avatarPath=AVATAR_PATH;
const User=mongoose.model('User',userSchema);

module.exports= User;


