var express = require('express');
var createDb = require('./CreateDB.js');
var sqlite3 = require('sqlite3');
var bodyParser = require('body-parser');
var restMessageHandler = require('./restMessageHandler.js');

var app = express();
createDb.createDB();

app.use(express.static('webapp'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// /rest/channel/chats/msg/<channelID>/<userID>?msg= (POST) (public)
app.post('/rest/channel/chats', restMessageHandler.postChannelMessage);

app.listen(3000, function () {
  console.log('Slack Clone listening on port 3000!');
});