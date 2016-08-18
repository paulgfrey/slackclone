var sqlite3 = require('sqlite3');

exports.getChannelMessagesJSON = getChannelMessagesJSON;
function getChannelMessagesJSON(db,channelID) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM MESSAGES M1"
            + "  WHERE M1.CHANNELID = '" + channelID + "'"
            + " ORDER BY M1.TIMESTAMP";
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