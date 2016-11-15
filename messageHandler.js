var sqlite3 = require('sqlite3');

/**
 * This method inserts a channel message into the database.
 */
exports.addChannelMessage = addChannelMessage;
function addChannelMessage(db, channelId, userId, msg) {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO MESSAGES(CHANNELID, USERID, MSG) " +
                "VALUES (?, ?, ?)";
        db.run(sql, channelId, userId, msg, function(err) {
            if(err) {
                reject(err);
                throw err;
            }
            else {
                console.log('Inserted msg [' + msg + '] into message table from ' + userId);
                resolve(this.lastID);
            }
        });
    });
}