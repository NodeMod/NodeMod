const express = require('express');
const router = express.Router();

// Check if an user has logged in into discord
function isAuthorized(req, res, next) {
    if(req.user) {
        console.log("User is logged in");
        console.log(req.user);
        next();
    } else {
        console.log("User is logged in");
        res.redirect('/');
    }
}

router.get('/', isAuthorized, (req, res) => {
    res.send(200);
});

module.exports = router;
