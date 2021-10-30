const fs = require('fs');

function editOrCreateFile(path, content) {

    fs.writeFile(path, content, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Successfully writed at the file at "+path);
    });
}

module.exports = {
    editOrCreateFile: editOrCreateFile
}
