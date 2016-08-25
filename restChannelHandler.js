// /rest/channel/chats/msg/<channelID>/<userID>?msg= (POST) (public)
var channelHandler = require('./channelHandler.js');

var dbHandler = require('./dbHandler.js');

exports.getChannelMessages = getChannelMessages;
function getChannelMessages(req, res) {
    console.log('Obtaining the Channel Message');

    var conn = dbHandler.getDbConn();

    var returnedChannelId = req.params.channelID;
    console.log('Channel id is: '+ returnedChannelId);


    channelHandler.getChannelMessagesJSON(conn,returnedChannelId)
    .then(
        (messages) => {
            res.send(messages);
        }
    )
    .catch(function(err) {
        res.send({error: err}); 
    });
    
}

exports.createChannel = createChannel;
function createChannel(req, res) {
    console.log('create channel');

    var conn = dbHandler.getDbConn();

    var name = req.body.name;
    var teamId = req.body.teamId;

    channelHandler.createChannelDb(conn, name, teamId)
    .then(
        (rtnChannelId) => {
            res.send(JSON.stringify({ channelId: rtnChannelId }));
        }
    )
}