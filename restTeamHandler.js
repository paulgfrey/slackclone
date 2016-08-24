var teamlHandler = require("./teamHandler.js");
var dbHandler = require('./dbHandler.js');

exports.getTeamByUserIDJSON = getTeamByUserIDJSON;
function getTeamByUserIDJSON(req, res) {
    console.log('getTeamByUserIDJSON()');

    var conn = dbHandler.getDbConn();
    var userId = req.params.userId;

    teamlHandler.getTeamByUserIDJSON(conn, userId)
        .then(
        (teams) => {
            res.send(teams);
        })
        .catch(function (err) {
            res.send({ error: err });
        });

}

exports.getTeamsByUserIDJSON = getTeamsByUserIDJSON;
function getTeamsByUserIDJSON(req, res) {
    console.log('getTeamsByUserIDJSON()');

    var conn = dbHandler.getDbConn();
    var userId = req.params.userId;

    teamlHandler.getTeamsByUserIDJSON(conn, userId)
        .then(
        (teams) => {
            res.send(teams);
        })
        .catch(function (err) {
            res.send({ error: err });
        });

}

exports.getAllTeams = getAllTeams;
function getAllTeams(req, res) {
    console.log('getAllTeams');

    var conn = dbHandler.getDbConn();
    
    teamlHandler.getAllTeams(conn)
        .then(
        (teams) => {
            res.send(teams);
        })
        .catch(function (err) {
            res.send({ error: err });
        });

}