// /rest/user/:userId
var userHandler = require('./userHandler.js');

var dbHandler = require('./dbHandler.js');

exports.getUser = getUser;
function getUser(req, res) {
    console.log('Getting the User');

    var conn = dbHandler.getDbConn();

    var userId = req.params.userId;
    console.log('userId= '+ userId);

    userHandler.getUserProfileJSON(conn, userId)
    .then(
        (userJSON) => {
            res.send(userJSON);
        }
    )
    .catch(function(err) {
        res.send({error: err}); 
    });
}

exports.getUserByLogin = getUserByLogin;
function getUserByLogin(req, res) {
    console.log('getting user by login');

    var conn = dbHandler.getDbConn();

    var name = req.body.name;
    var password = req.body.password;

    userHandler.getUserByNamePassword(conn, name, password)
    .then(
        (userJSON) => {
            res.send(userJSON);
        }
    )
    .catch(function(err) {
        res.send({error: err}); 
    });
}

exports.createUser = createUser;
function createUser(req, res) {
    console.log('create User');

    var conn = dbHandler.getDbConn();

    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    var teamId = req.body.teamId;

    var rtnUserId;

    userHandler.createUser(conn, name, password, email)
    .then(
        (userId) => {
            var rtnUserId = userId;
            userHandler.createTeamUser(conn, userId, teamId)
            .then(
                (teamUsersId) => {
                    res.send(JSON.stringify({ userId: rtnUserId}));
                }
            )
            .catch(function(err) {
                res.send({error: err});
            })
        }
    )
    .catch(function(err) {
        res.send({error: err}); 
    });
}

exports.getAllUsers = getAllUsers;
function getAllUsers(req, res) {
    console.log('Getting all Users');

    var conn = dbHandler.getDbConn();

    userHandler.getAllUsersDb(conn)
    .then(
        (usersJSON) => {
            res.send(usersJSON);
        }
    )
    .catch(function(err) {
        res.send({error: err}); 
    });
}