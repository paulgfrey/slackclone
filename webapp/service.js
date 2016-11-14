slackCloneApp.factory('service', function ($http, $rootScope, $cookies) {
    var users = [];
    var loadUsers = function () {
        return $http.get('/rest/users/all/')
            .then(function (response) {
                users = response.data;
                for(var i = 0; i < users.length; i++) {
                    var user = users[i];
                    var img = new Image();
                    var goodImage = function(evt) {
                        this.user.avatarImg = "images/user" + this.user.id + ".jpg";
                    };
                    var badImage = function() {
                        this.user.avatarImg = "images/default.jpg";
                    }
                    img.onload = goodImage.bind( {user: user} );
                    img.onerror = badImage.bind( {user: user} );
                    img.src = "images/user" + user.id + ".jpg";
                }
            },
            function (response) {
                return 'HTTP error ' + response.statusText;
            });
    }
    loadUsers();

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
                    .then(function (response) {
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
                    .then(function (response) {
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
                    .then(function (response) {
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
                    function (response) {
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
                    function (response) {
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
        getMsgs: function (channelId) {
            return new Promise((resolve, reject) => {
                $http.get('/rest/channel/chats/' + channelId)
                    .then(function (response) {
                        resolve(response.data);
                    },
                    function (response) {
                        reject('HTTP error ' + response.statusText);
                    });
            });
        },
        getChannels: function (teamId, userId) {
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
        reLoadAllUsers: function () {
            loadUsers();
        },
        getCachedUser: function (userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === userId) {
                    return (users[i]);
                }
            }
            // No user found so this must be a new user.
            this.reLoadAllUsers();
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
        saveUserId: function (userId) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $cookies.put('userId', userId, { 'expires': expireDate });
        },
        removeSavedUserId: function () {
            $cookies.remove('userId');
        },
        getSavedUserId: function () {
            return $cookies.get('userId');
            //return rtnId;            
        },
        getCurrentUsersByChannel: function(channelId) {
            return new Promise((resolve, reject) => {
                $http.get('/rest/users/' + channelId)
                    .then(function (response) {
                        resolve(response.data);
                    },
                    function (response) {
                        reject('HTTP error ' + response.statusText);
                    });
            });
        },
        getChannelUsers: function() {
            return new Promise((resolve, reject) => {
                $http.get('/rest/channels/users')
                    .then(function (response) {
                        resolve(response.data);
                    },
                    function (response) {
                        reject('HTTP error ' + response.statusText);
                    });
            });
        },
        addUserToChannel: function(channelId, userId) {
            return new Promise((resolve, reject) => {
                $http.get('/rest/users/add/' + channelId + "/" + userId)
                    .then(function (response) {
                        resolve(response.data);
                    },
                    function (response) {
                        reject('HTTP error ' + response.statusText);
                    });
            });
        },
        removeUserFromChannel: function(channelId, userId) {
            return new Promise((resolve, reject) => {
                $http.get('/rest/users/remove/' + channelId + "/" + userId)
                    .then(function (response) {
                        resolve(response.data);
                    },
                    function (response) {
                        reject('HTTP error ' + response.statusText);
                    });
            });        
        }
    };
});
