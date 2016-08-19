slackCloneApp.controller('channelsCtrl', function ($rootScope, $scope, $location, service) {
  console.log('channelsCtrl');
service.getChannels($rootScope.team.Id,$rootScope.user.id)
  .then((channels) => {
    $scope.channels = channels;
  });

});