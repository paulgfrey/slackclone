// /rest/channel/chats/msg/<channelID>/<userID>?msg= (POST) (public)
var messageHandler = require('./messageHandler.js');
var dbHandler = require('./dbHandler.js');

exports.postChannelMessage = postChannelMessage;
function postChannelMessage(req, res) {
    console.log('postChannelMessage()');

    var conn = dbHandler.getDbConn();

    var channelId = req.param.channelId;
    var userId = req.param.userId;
    var msg = req.body.msg;

    messageHandler.addChannelMessage(conn, channelId, userId, msg)
    .then(
        (msgId) => {
            res.send({ msgId: msgId });
        }
    )
    .catch(function(err) {
        res.status(500).json({ error: 'message' });
    });
}