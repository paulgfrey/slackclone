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
