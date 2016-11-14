// /rest/user/:userId
var userHandler = require('./userHandler.js');

var dbHandler = require('./dbHandler.js');

// A 2 dimensional array of users by channel Id
var channelUsers = [[]];

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

exports.getCurrentUsersByChannel = getCurrentUsersByChannel;
function getCurrentUsersByChannel(req, res) {
    var channelId = req.params.channelId;
    console.log('getCurrentUsersByChannel(' + channelId + ')');   

    if(channelUsers[channelId]) {
        res.send(JSON.stringify(channelUsers[channelId]));
    }
    else {
        res.send(JSON.stringify(new Array()));
    }
}

exports.getChannelUsers = getChannelUsers;
function getChannelUsers(req, res) {
    res.send(JSON.stringify(channelUsers));
}

function isUserInChannel(channelId, userId) {
    if(channelUsers[channelId] == undefined) {
        return(false);
    }
    for(var i = 0; i < channelUsers[channelId].length; i++) {
        if(channelUsers[channelId][i].id == userId) {
            return(true);
        }
    }
    return(false);
}

exports.addUserToChannel = addUserToChannel;
function addUserToChannel(req, res) {
    console.log('addUserToChannel');
    var channelId = req.params.channelId;
    var userId = req.params.userId;

    if(isUserInChannel(channelId, userId)) {
        console.log('user ' + userId + ' is already in channel ' + channelId);
        res.send('ok');
    }

    var conn = dbHandler.getDbConn();

    userHandler.getAllUsersDb(conn)
    .then(
        (usersJSON) => {
            var users = JSON.parse(usersJSON);
            for(var i = 0; i < users.length; i++) {
                if(users[i].id == userId) {
                    console.log("Add user " + JSON.stringify(users[i]) + 
                        " channel ID " + channelId);
                    if(channelUsers[channelId] == undefined) {
                        channelUsers[channelId] = new Array();
                    }
                    channelUsers[channelId].push(users[i]);
                    res.send("ok");
                    return; 
                }
            }
            res.send("ok");
        }
    )
    .catch(function(err) {
        res.send({error: err}); 
    });
}

exports.removeUserFromChannel = removeUserFromChannel;
function removeUserFromChannel(req, res) {
    console.log('removeUserToChannel');
    var channelId = req.params.channelId;
    var userId = req.params.userId;

    if(channelUsers[channelId] == undefined) {
        console.log("Warning: channelUsers was empty!");
        res.send(userId);
    }
    else {
        if(! isUserInChannel(channelId, userId)) {
            console.log('user ' + userId + ' is not in channel ' + channelId);
            res.send('ok');
        }
        var users = channelUsers[channelId];
        for(var i = 0; i < users.length; i++) {
            if(users[i].id == userId) {
                console.log("Remove user " + JSON.stringify(users[i]) + 
                        " channel ID " + channelId);
                channelUsers[channelId].splice(i, 1);
                res.send("ok");
                break;
            }
        }
    }
}