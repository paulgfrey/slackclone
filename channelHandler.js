var sqlite3 = require('sqlite3');

exports.getChannelMessageJSON = getChannelMessageJSON;
function getChannelMessageJSON(db,channelID) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM MESSAGES M1"
            + "  WHERE M1.CHANNELID = '" + channelID + "'"
            + " ORDER BY M1.TIMESTAMP";
        var users = [];
        
        db.each(query,
            function(err, row) {
                users.push({ id: row.ID, userID: row.USERID, channelID: row.CHANNELID, 
                    timeStamp: row.TIMESTAMP,message: row.MSG });
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve(JSON.stringify(users));
                }
        });
    });
}