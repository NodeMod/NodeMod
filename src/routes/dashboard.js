require('dotenv').config();
require('./strategies/discordstrategy')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3560;
const session = require('express-session');
const passport = require('passport');
const db = require('./database/database');
const path = require('path');

db.then(() => console.log('Connected to Database')) // Connects to the database
    .catch(err => console.log(err)); // Logs the error if there is one

const authRoute = require('./routes/auth'); // Authorization route for the website
const dashboardRoute = require('./routes/dashboard'); // Route for the bot dashboard

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    name: 'discord-oauth2'
}))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Applies auth.js middleware route
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);

function isAuthorized(req, res, next) {
    if(req.user) {
        console.log("User is logged in");
        console.log(req.user);
        next();
    } else {
        console.log("User is not logged in");
        res.redirect('/');
    }
}

app.get('/', isAuthorized, (req, res) => {
    res.render('home');
})

app.listen(PORT, () => {
    console.log("Now listening to requests on port "+PORT);
})
