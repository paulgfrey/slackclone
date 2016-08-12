var sqlite3 = require('sqlite3');

exports.getUserProfileJSON = getUserProfileJSON;
function getUserProfileJSON(db, userId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM USERS "
            + "  WHERE ID = '" + userId + "'";
        var user;
        db.each(query,
            function(err, row) {
                user = { id: row.ID, name: row.NAME, password: row.PASSWORD, email: row.EMAIL };
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(JSON.stringify(user));
                }
        });
    });
}

exports.createUserProfile = createUserProfile;
function createUserProfile(db, id, name, password, email) {
    /*
    var sql = "INSERT INTO USER(ID, NAME, PASSWORD, EMAIL) " +
                "VALUE (?, ?, ?, ?)";
    db.run(sql, id, name, password, email, (err) => {
        if(err) {
            throw(err);
        }

    })
    */
}