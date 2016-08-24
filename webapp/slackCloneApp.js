var slackCloneApp = angular.module("slackCloneApp", ['ngRoute', 'ngCookies', 'luegg.directives']);
slackCloneApp.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'index.html',
            controller: 'mainCtrl'
        })
        .when('/login', {
            templateUrl: 'loginTemplate.html',
            controller: 'loginCtrl'
        })
        .when('/signup', {
            templateUrl: 'newUserTemplate.html',
            controller: 'newUserCtrl'
        })
        .when('/messages', {
            templateUrl: 'channelsTemplate.html',
            controller: 'channelMsgsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

/*
TODO Not working
slackCloneApp.filter('imageTag', function() {
    return function(input) {
        var output = input;
        var matches = input.match('http\:.*.jpg');
        for(var i = 0; i < matches.length; i++) {
            var newImageTag = '<img src=\'' + matches[i] + '\'>'
            output = output.replace(matches[i], newImageTag);
        }
        return output;
    }
});
*/