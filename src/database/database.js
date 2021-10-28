const mongoose = require('mongoose');

// Connects to the Database and returns the connection back
module.exports = mongoose.connect('mongodb://localhost:27017/discordauth', {
    useNewUrlParser: true
});
