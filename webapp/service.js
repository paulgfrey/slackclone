slackCloneApp.factory('service', function ($http, $rootScope) {
    return {
        getUser: function (userId, callback) {
            $http.get('/rest/user/' + userId).success(function (user) {
                callback(user);
            });
        },
        getUserByLogin: function (_name, _password, callback) {
            var req = {
                method: 'POST',
                url: '/rest/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ name: _name, password: _password })
            };
            $http(req).success(function (data) {
                callback(data);
            });
        },
        getFirstChannel: function (teamId, userId, callback) {
            $http.get('/rest/team/channels/' + teamId + '/' + userId).success(function (channels) {
                var channel = channels[0];
                callback(channel);
            });
        },
        getFirstTeam: function (userId, callback) {
            $http.get('/rest/team/user/' + userId).success(function (teams) {
                var team = teams[0];
                callback(team);
            });
        },
        getMsgs: function(channelId, callback) {
            $http.get('/rest/channel/chats/' + channelId).success(function (messages) {
                callback(messages);
            });
        },
        getChannels: function(teamId, callback) {

        },
        postMsg: function (channelId, userId, _msg, callback) {
            var req = {
                method: 'POST',
                url: '/rest/channel/chats/' + channelId + '/' + userId,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ msg: _msg })
            };
            $http(req).success(function (msgId) {
                callback(msgId);
            });
        },
        saveUserId: function(userId) {
            document.cookie = "userid=" + userId + ";"; 
        },
        getSavedUserId: function() {
            var rtnId;
            if (document.cookie) {
                rtnId= document.cookie.split(";")[0].split("=")[1];
            }

            return rtnId;            
        }
    };
});
