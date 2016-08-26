var slackCloneApp = angular.module("slackCloneApp", ['ngRoute', 'ngCookies', 'luegg.directives', 'ngSanitize']);
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

slackCloneApp.filter('imageTag', function () {
    var convertImages = function (input, extension) {
        var output = input;
        if (!output) {
            return output
        }
        if(input.match("<img.*" + extension)) {
            // Already filtered so exit
            return(output);
        }
        var matches = input.match('http://.*' + extension);
        if (matches) {
            for (var i = 0; i < matches.length; i++) {
                var newImageTag = '<a target=\'_blank\' href=\'' + matches[i] + '\'><img width="300px" src=\'' + matches[i] + '\'></a>';
                output = output.replace(matches[i], newImageTag);
            }
        }
        return output;
    }

    return function (input) {
        var output = convertImages(input, ".jpg");
        output = convertImages(output, ".png");
        output = convertImages(output, ".gif");

        return (output);
    }
});

slackCloneApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});