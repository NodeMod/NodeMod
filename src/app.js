require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3560;
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./strategies/discordstrategy')
const db = require('./database/database');

db.then(() => console.log('Connected to Database')) // Connects to the database
    .catch(err => console.log(err)); // Logs the error if there is one

const authRoute = require('./routes/auth'); // Authorization route for the website

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false
}))

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Applies auth.js middleware route
app.use('/auth', authRoute);

app.listen(PORT, () => {
    console.log("Now listening to requests on port "+PORT);
})
