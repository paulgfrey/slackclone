var slackCloneApp = angular.module("slackCloneApp", ['ngRoute', 'ngCookies', 'luegg.directives']);
slackCloneApp.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'index.html',
            controller: 'mainCtrl'
        }).
        when('/login', {
            templateUrl: 'loginTemplate.html',
            controller: 'loginCtrl'
        }).
        when('/messages', {
            templateUrl: 'channelsTemplate.html',
            controller: 'channelMsgsCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
});
slackCloneApp.directive('ngScrollBottom', ['$timeout', function ($timeout) {
    return {
        scope: {
            ngScrollBottom: "="
        },
        link: function ($scope, $element) {
            $scope.$watchCollection('ngScrollBottom', function (newValue) {
                if (newValue) {
                    $timeout(function () {
                        $element.scrollTop($element[0].scrollHeight);
                    }, 0);
                }
            });
        }
    }
}]);
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