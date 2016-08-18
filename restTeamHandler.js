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