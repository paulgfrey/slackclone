var sqlite3 = require('sqlite3');

exports.getTeamByUserIDJSON = getTeamByUserIDJSON;
function getTeamByUserIDJSON(db, USERID) {
    return new Promise((resolve, reject) => {
        var query = "Select T1.* from Team T1, TeamUsers TU1" +
        " Where T1.ID = TU1.TEAMID " +
	      "and TU1.USERID = ?";
        var teams = [];
        db.each(query, USERID,
            function(err, row) {
                teams.push({ id: row.ID, name: row.NAME });
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    console.log('getTeamByUserIDJSON()=' + JSON.stringify(teams));
                    resolve(JSON.stringify(teams));
                }
        });
    });
}

exports.getTeamsByUserIDJSON = getTeamByUserIDJSON;
function getTeamsByUserIDJSON(db, USERID) {
    return new Promise((resolve, reject) => {
        var query = "Select T1.* from Team T1, TeamUsers TU1" +
        " Where T1.ID = TU1.TEAMID " +
	      "and TU1.USERID = ?";
        var teams = [];
        db.each(query, USERID,
            function(err, row) {
                teams.push({ id: row.ID, name: row.NAME });
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    console.log('getTeamByUserIDJSON()=' + JSON.stringify(teams));
                    resolve(JSON.stringify(teams));
                }
        });
    });
}

exports.getChannelsByTeamAndUser = getChannelsByTeamAndUser;
function getChannelsByTeamAndUser(db, userId, teamId) {

    return new Promise((resolve, reject) => {
        var query = " Select 	C1.*   from Channel C1, TeamUsers TU1 " +
            " Where 	C1.TEAMID = TU1.TEAMID " +
	        " And TU1.USERID = ? " +
	        " AND TU1.TEAMID = ? AND C1.TYPE = 'Public'";
        var channels = [];
        db.each(query,userId, teamId,
            function(err, row) {
                channels.push({ id: row.ID, name: row.NAME, teamId: row.TEAMID, description : row.DESCRIPTION, type: row.TYPE });
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve(JSON.stringify(channels));
                }
        });
    });

}

exports.getAllTeamUsersDb = getAllTeamUsersDb;
function getAllTeamUsersDb(db, teamId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT U.* FROM USERS U, TEAMUSERS TU " +
                    "WHERE U.ID = TU.USERID AND TU.TEAMID = ?";
        var users = [];
        db.each(query,
            function(err, row) {
                users.push({ id: row.ID, name: row.NAME, password: row.PASSWORD, email: row.EMAIL });
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    console.log('getAllTeamUsers()=' + JSON.stringify(users));
                    resolve(JSON.stringify(users));
                }
        });
    });   
}

exports.getAllTeams = getAllTeams;
function getAllTeams(db, userId, teamId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM TEAM";
        var teams = [];
        db.each(query,
            function(err, row) {
                teams.push({ id: row.ID, name: row.NAME });
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    console.log('getAllTeamsList()=' + JSON.stringify(teams));
                    resolve(JSON.stringify(teams));
                }
        });
    });

}

/*exports.createTeamUserProfile = createTeamUserProfile;
function createTeamUserProfile(db, USERID, TEAMID) {
    // TODO Need to return ID from DB.
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO TEAMUSERS(USERID,TEAMID) " +
                "VALUES ('5', '2')";
                // "VALUES (?,?)";
        db.run(sql,  USERID, TEAMID,  function(err) {
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
}*/