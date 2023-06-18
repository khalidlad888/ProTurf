//Requiring express and port
const express = require('express');
const port = 8000;
const app = express();

//importing library cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//Importing mongoose databaase
const db = require('./config/mongoose');

//Using passport auth
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
//using mongo store for storing session cookies
const MongoStore = require('connect-mongo')(session);

//Use express static to access assets
app.use(express.static('./assets'));

//Use library express-ejs-layouts
const expresslayouts = require('express-ejs-layouts');
const { start } = require('repl');
app.use(expresslayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setting view engine using ejs template
app.set('view engine', 'ejs');
app.set('views', './views');


//Use mongo store the session cookies in db
app.use(session({
    name: 'Faceloop',
    // TODO change the secret before deployment
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || "connect-mobgodb setup ok");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport-local-strategy')

app.use(passport.setAuthenticatedUser);

//requiring routes
app.use('/', require('./routes'));


//starting server with app.listen on $port
app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the port', err);
    };

    console.log('Express server is runnig on port:', port);
});