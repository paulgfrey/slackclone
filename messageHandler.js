var sqlite3 = require('sqlite3');
var userHandler = require('userHandler.js');

exports.addChannelMessage = addChannelMessage;
function addChannelMessage(db, teamId, channelId, userId, msg) {
    // TODO Need to return ID from DB.
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO MESSAGES(NAME, PASSWORD, EMAIL) " +
                "VALUES (?, ?, ?)";
        db.run(sql, name, password, email, function(err) {
            if(err) {
                reject(err);
                throw err;
            }
            else {
                console.log('this=' + JSON.stringify(this));
                console.log('this.lastID=' + this.lastID);
                resolve(this.lastID);
            }
        });
    });
}