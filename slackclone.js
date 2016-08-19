var express = require('express');
var createDb = require('./CreateDB.js');
var sqlite3 = require('sqlite3');
var bodyParser = require('body-parser');
var restMessageHandler = require('./restMessageHandler.js');
var restChannelHandler = require('./restChannelHandler.js');
var restUserHandler = require('./restUserHandler.js');
var restTeamHandler = require('./restTeamHandler.js');
var restTeamChannelsHandler = require('./restTeamChannelsHandler.js');
var restChannelHandler = require('./restChannelHandler.js');

var app = express();
createDb.createDB();

app.use(express.static('webapp'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// /rest/channel/chats/msg/<channelID>/<userID>?msg= (POST) (public)
app.post('/rest/channel/chats', restMessageHandler.postChannelMessage);

// /rest/channel/chats/<channelID> json list of chat messages for channel (GET)
app.get('/rest/channel/chats/:channelID', restChannelHandler.getChannelMessages);

// /rest/user/<userId> json object of user
app.get('/rest/user/:userId', restUserHandler.getUser);

// /rest/login
app.post('/rest/login', restUserHandler.getUserByLogin);

app.get('/rest/team/user/:userId', restTeamHandler.getTeamByUserIDJSON);

// /rest/team/channels/<teamID>/<userID>
app.get('/rest/team/channels/:teamId/:userId', restTeamChannelsHandler.getChannelsByTeamAndUser);

// /rest/channel/chats/<channelID>
app.get('/rest/channel/chats/:channelId',  restChannelHandler.getChannelMessages);

app.listen(3000, function () {
  console.log('Slack Clone listening on port 3000!');
});