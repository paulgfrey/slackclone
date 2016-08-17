var sqlite3 = require('sqlite3');

exports.getChannelMessageJSON = getUserProfileJSON;
function getChannelMessageJSON(db, teamID,channelID) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM MESSAGES M1,CHANNEL C1"
            + "  WHERE M1.CHANNELID = C1.ID"
            + "  AND M1.;
        var user;
        db.each(query,
            function(err, row) {
                user = { id: row.ID, name: row.NAME, password: row.PASSWORD, email: row.EMAIL };
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve(JSON.stringify(user));
                }
        });
    });
}