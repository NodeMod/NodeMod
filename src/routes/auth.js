const express = require('express');
const router = express.Router();
const passport = require('passport');

// Check if an user has logged in into discord
function isAuthorized(req, res, next) {
    if(req.user) {
        res.render("alreadylogged", {
            username: req.user.username,
            discriminator: req.user.discriminator,
            avatar: req.user.avatar,
        });
    } else {
        next();
    }
}

router.get('/', isAuthorized, passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/',
    successRedirect: '/dashboard'
}));

router.get('/logout', (req, res) => {
    if(req.user) {
        req.logOut();
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

module.exports = router;
