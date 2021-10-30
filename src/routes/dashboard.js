const express = require('express');
const router = express.Router();

// Check if an user has logged in into discord
function isAuthorized(req, res, next) {
    if(req.user) {
        console.log(req.user);
        next();
    } else {
        res.redirect('/auth');
    }
}

router.get('/', isAuthorized, (req, res) => {
    res.render("dashboard", {
        username: req.user.username,
        discriminator: req.user.discriminator,
        avatar: req.user.avatar,
    });
});

router.get('/settings', isAuthorized, (req, res) => {
    res.send(200);
});

module.exports = router;
