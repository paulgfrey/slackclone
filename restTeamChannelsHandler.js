///rest/team/channels/<teamID>/<userID> json list channels for that teamID and userID

var ChannelHandler = require("./teamHandler.js");
var dbHandler = require('./dbHandler.js');
//var db = new sqlite3.Database('testslackclone.db');
exports.getChannelByTeamAndUser = getChannelByTeamAndUser;
function getChannelByTeamAndUser(req, res) {
    console.log('getChannelByTeamAndUser()');

    var conn = dbHandler.getDbConn();

    var teamid = req.params.teamid;
    var userid = req.params.userid;
    //messageHandler.addChannelMessage(conn, channelId, userId, msg)
    ChannelHandler.getChannelByTeamAndUser(conn, userid, teamid)
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