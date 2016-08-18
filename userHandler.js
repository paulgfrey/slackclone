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
                    throw err;
                }
                else {
                    resolve(JSON.stringify(user));
                }
        });
    });
}

exports.getUserByNamePassword = getUserByNamePassword;
function getUserByNamePassword(db, name, password) {
    return(new Promise((resolve, reject) => {
        var query = "SELECT * from USERS "
                    + "WHERE name = ? and password = ?";
        var user;
        db.each(query, name, password,
            function(err, row) {
                user = {id: row.ID, name: row.NAME, password: row.PASSWORD, email: row.EMAIL};
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw(err);
                }
                else {
                    resolve(JSON.stringify(user));
                }
            });
    }
    ));
}

exports.createUserProfile = createUserProfile;
function createUserProfile(db, name, password, email) {
    // TODO Need to return ID from DB.
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO USERS(NAME, PASSWORD, EMAIL) " +
                "VALUES (?, ?, ?)";
        db.run(sql, name, password, email, function(err) {
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