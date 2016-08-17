var express = require('express');
var createDb = require('./CreateDB.js');
var sqlite3 = require('sqlite3');
var bodyParser = require('body-parser');
var restMessageHandler = require('./restMessageHandler.js');

var app = express();
createDb.createDB();

app.use(express.static('webapp'));
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// /rest/channel/chats/msg/<channelID>/<userID>?msg= (POST) (public)
app.post('/rest/channel/chats/msg', restMessageHandler.postChannelMessage);

app.listen(3000, function () {
  console.log('Slack Clone listening on port 3000!');
});