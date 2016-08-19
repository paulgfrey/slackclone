slackCloneApp.factory('service', function ($http, $rootScope) {
    return {
        getUser: function (userId) {
            return new Promise((resolve, reject) => {
                $http.get('/rest/user/' + userId)
                .then(function (response) {
                    resolve(response.data);
                },
                function (response) {
                    reject('HTTP error ' + response.statusText);
                }
                );
            });
        },
        getUserByLogin: function (_name, _password) {
            return new Promise((resolve, reject) => {
                var req = {
                    method: 'POST',
                    url: '/rest/login',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({ name: _name, password: _password })     
                }
                $http(req)
                .then(function(response) {
                    resolve(response.data);
                },
                function (resposne) {
                    reject('HTTP error ' + response.statusText);
                });
            });
        },
        getFirstChannel: function (teamId, userId) {
            return new Promise((resolve, reject) => {
                $http.get('/rest/team/channels/' + teamId + '/' + userId)
                .then(function (response) {
                    var channel = response.data[0];
                    resolve(channel);
                },
                function(response) {
                    reject('HTTP error ' + response.statusText);
                });
            });
        },
        getFirstTeam: function (userId) {
            return new Promise((resolve, reject) => {
                $http.get('/rest/team/user/' + userId)
                .then(function (response) {
                    var team = response.data[0];
                    resolve(team);
                },
                function(response) {
                    reject('HTTP error ' + response.statusText);
                });
            });
        },            
        getMsgs: function(channelId) {
            return new Promise((resolve, reject) => {
                $http.get('/rest/channel/chats/' + channelId)
                .then(function (response) {
                    resolve(response.data);
                },
                function(response) {
                    reject('HTTP error ' + response.statusText);
                });
            });
        }, 
        getChannels: function(teamId, userId) {
            return new Promise((resolve, reject) => {
                $http.get('/rest/team/channels/'+ teamId + '/' + userId)
                .then(function (response) {
                    resolve(response.data);
                },
                function(response) {
                    reject('HTTP error ' + response.statusText);
                });
            });
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
            document.cookie = "userId=" + userId + ";"; 
        },
        removeSavedUserId: function () {
            $cookies.remove('userId');
        },
        getSavedUserId: function() {
            var rtnId;
            if (document.cookie) {
                // Get name followed by anything except a semicolon
                var cookiestring=RegExp("userId[^;]+").exec(document.cookie);
                // Return everything after the equal sign
                if(cookiestring) {
                    rtnId = unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
                }
            }
            return rtnId;            
        }
    };
});
