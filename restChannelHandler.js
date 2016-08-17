// /rest/channel/chats/msg/<channelID>/<userID>?msg= (POST) (public)
var channelHandler = require('./channelHandler.js');

var dbHandler = require('./dbHandler.js');

exports.getChannelMessage = getChannelMessage;
function getChannelMessage(req, res) {
    console.log('Obtaining the Channel Message');

    var conn = dbHandler.getDbConn();

    var returnedChannelId = req.params.channelID;
    console.log('Channel id is: '+ returnedChannelId);


    channelHandler.getChannelMessageJSON(conn,returnedChannelId)
    .then(
        (msgContent) => {
            res.send({ message: msgContent });
        }
    )
    .catch(function(err) {
        res.send({error: err}); 
    });
    
}