var sqlite3 = require('sqlite3');

exports.getUserProfileJSON = getUserProfileJSON;
function getUserProfileJSON(db, userId) {
    getUserInfoDBJSON(userId).then(
        (userJSON) => {
            return(userJSON);
        }
    ).catch((err) => {
        throw(err);
    });
}

function getUserInfoDBJSON(userId) {
    return new Promise((resolve, reject) => {
        console.log('getUserInfo');
        var db = new sqlite3.Database('scratch.db');
        var query = "SELECT NAME FROM USER "
            + "  WHERE USERID = '" + userId + "'";
        var user;
        db.each(query,
            function(err, row) {
                user = { userId: userId, name: row.NAME };
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    db.close();
                    resolve(JSON.stringify(user));
                }
        });
    });
}