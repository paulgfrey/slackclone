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
        createUser: function (_name, _password, _email, _teamId) {
            return new Promise((resolve, reject) => {
                var req = {
                    method: 'POST',
                    url: '/rest/create/user',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({ name: _name, password: _password, email: _email, teamId: _teamId })     
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
        createChannel: function (_name, _teamId) {
            return new Promise((resolve, reject) => {
                var req = {
                    method: 'POST',
                    url: '/rest/channel/create',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({ name: _name, teamId: _teamId })     
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
        getTeams: function (userId) {
            return new Promise((resolve, reject) => {
                $http.get('/rest/teams/user/' + userId)
                    .then(function (response) {
                        var teams = response.data;
                        resolve(teams);
                    },
                    function (response) {
                        reject('HTTP error ' + response.statusText);
                    });
            });
        }, 
        getAllTeams: function () {
            return new Promise((resolve, reject) => {
                $http.get('/rest/teams/all')
                    .then(function (response) {
                        var teams = response.data;
                        resolve(teams);
                    },
                    function (response) {
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
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $cookies.put('userId', userId, {'expires': expireDate});
        },
        removeSavedUserId: function () {
            $cookies.remove('userId');
        },
        getSavedUserId: function() {
            return $cookies.get('userId');
            //return rtnId;            
        },
        checkImage(src, goodFunc, badFunc) {
            var img = new Image();
            img.onload = goodFunc;
            img.onerror = badFunc;
            img.src = src;
        }
    };
});
