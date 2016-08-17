// /rest/channel/chats/msg/<channelID>/<userID>?msg= (POST) (public)
var messageHandler = require('./messageHandler.js');
var dbHandler = require('./dbHandler.js');

exports.postChannelMessage = postChannelMessage;
function postChannelMessage(req, res) {
    console.log('postChannelMessage()');

    var conn = dbHandler.getDbConn();
}