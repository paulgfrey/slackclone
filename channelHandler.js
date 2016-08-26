var sqlite3 = require('sqlite3');

exports.getChannelMessagesJSON = getChannelMessagesJSON;
function getChannelMessagesJSON(db,channelID) {
    return new Promise((resolve, reject) => {
        var query = "SELECT ID, USERID, CHANNELID, datetime(timestamp, 'localtime') as TIMESTAMP, MSG  FROM MESSAGES"
            + "  WHERE CHANNELID = '" + channelID + "'"
            + " ORDER BY TIMESTAMP";
        var messages = [];
        db.each(query,
            function(err, row) {
                messages.push({ id: row.ID, userId: row.USERID, channelId: row.CHANNELID, 
                    timeStamp: row.TIMESTAMP,message: row.MSG });
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve(JSON.stringify(messages));
                }
        });
    });
}

exports.createChannelDb = createChannelDb;
function createChannelDb(db, name, teamId) {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO CHANNEL (NAME, TEAMID, DESCRIPTION, TYPE) " +
                    "VALUES (?, ?, ?, 'Public')";
        db.run(sql, name, teamId, name, function(err) {
            if(err) {
                reject(err);
                throw err;
            }
            else {
                resolve(this.lastID);
            }
        });
    });
}