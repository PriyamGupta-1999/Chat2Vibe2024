const fs= require('fs')
const rfs=require('rotating-file-stream')
const path=require('path')
require("dotenv").config();


const logDirectory= path.join(__dirname, '../production_logs');

fs.existsSync(logDirectory)|| fs.mkdirSync(logDirectory);

console.log("*******",logDirectory);
const accessLogStream= rfs.createStream('access.log',{
    size:    "300M",
    interval: "1d", // rotate daily
    
    path: '../production_logs'
})

// console.log(process.env.CODIEAL_ASSET_PATH);

const development = {
    name: 'development',
    asset_path: process.env.CODIEAL_ASSET_PATH,
    session_cookie_key: process.env.CODIEAL_SESSION_COOKIE_KEY,
    db: 'codiel_production',
    google_client_id:process.env.CODIEAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODIEAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: "http://localhost:8000/users/auth/google/callback", //matched from google credenetials 
    jwt_secret:process.env.CODIEAL_JWT_SECRET,
    morgan: {
        mode: 'dev',
        options: {stream : accessLogStream}
    },
}

const production ={
    name: 'production',
    asset_path: process.env.CODIEAL_ASSET_PATH,
    session_cookie_key: process.env.CODIEAL_SESSION_COOKIE_KEY,
    db: 'codiel_development',
    google_client_id:process.env.CODIEAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODIEAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: "http://localhost:8000/users/auth/google/callback", //matched from google credenetials 
    // jwt_secret:'codiel',
    jwt_secret:process.env.CODIEAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream : accessLogStream}
    }
}

//NOT KNOWN

module.exports= eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV) ;


