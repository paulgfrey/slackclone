///rest/team/channels/<teamID>/<userID> json list channels for that teamID and userID

var ChannelHandler = require("./teamHandler.js");
var dbHandler = require('./dbHandler.js');
//var db = new sqlite3.Database('testslackclone.db');
exports.getChannelsByTeamAndUser = getChannelsByTeamAndUser;
function getChannelsByTeamAndUser(req, res) {
    console.log('getChannelsByTeamAndUser()');

    var conn = dbHandler.getDbConn();

    var teamId = req.params.teamId;
    var userId = req.params.userId;
    ChannelHandler.getChannelsByTeamAndUser(conn, userId, teamId)
        .then(
        (channels) => {
            // res.send({ id:id,name:name,teamid:teamid,description:description,tyep:tyep}); 
            //: channelId,userId:userId});
            res.send(channels);
        }
        /* (msgContent) => {
             //res.send({ msgContent });
             console.log("Here is the message: " + msgContent);
         }*/
        )
        .catch(function (err) {
            res.send({ error: err });
        });

}