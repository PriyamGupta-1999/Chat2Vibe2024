const express=require('express');

const env= require('./config/environment');

const logger = require('morgan');
const dotenv = require("dotenv");

const app=express();

dotenv.config();


//now this will passed to view helpers
require('./config/view-helper')(app);
const port=8000;
//cookie parser
// const cookieParser=require('cookie-parser');
//database 
const db=require('./config/mongoose');


//layouts use  Note: include before views to use them in views
const expressLayouts=require('express-ejs-layouts');
const cookieParser = require('cookie-parser');


//used for the cookie session 
const session = require('express-session');
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');

const passportgoogle= require('./config/passport-google-oauth2-strategy');
//to connect and store session in mongoose db for user to keep signed in after server refresh

const MongoStore=require('connect-mongo')(session);

//require for flash messages 
const flash=require('connect-flash');

//custom middleeware to add flash messages to locals 
const CustomMware= require('./config/middleware');



app.use(expressLayouts);


app.use(express.static(env.asset_path));

//parser for requested objects
app.use(express.urlencoded({extended: false}));

//adding parser for cookies which can be used as middleware
app.use(cookieParser());

//make the uupload path available to our broweser for avatar purposee
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(logger(env.morgan.mode,env.morgan.optons));


// for extracting style and script tag into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting view engine
app.set('view engine','ejs');
app.set('views','./views');




//chatting engine congig , chat server 
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(6000);
console.log('chat server is listening on port 6000');

//MONGO STORE USED TO STORE SESSION COOKIE IN db
//midddlware for key 
app.use(session({
    name: 'codeial',
    //to do change the secret before deployment in productionm mode 
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },//addding mongotore to keep it even when server restarts 
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect mongodb setup ok ');
        }
    )
    
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//placed here as used after the set authenticated 
app.use(flash());
app.use(CustomMware.setFlash);


//uisng router of routes
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`error: ${port}`);
    }

    console.log(`server is running up ${port}`);
})