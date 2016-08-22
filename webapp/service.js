slackCloneApp.factory('service', function ($http, $rootScope, $cookies) {
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
                url: '/rest/channel/chats/msg/' + channelId + '/' + userId,
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
            $cookie.put('userId', userId);
        },
        removeSavedUserId: function () {
            $cookies.remove('userId');
        },
        getSavedUserId: function() {
            return $cookies.get('userId');
            //return rtnId;            
        }
    };
});
