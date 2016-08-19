slackClone.controller('channelCtrl', function ($rootScope, $scope, service) {

  var userId = req.params.userId;
  var teamId = req.params.teamId;
  $scope.channel[] = function () {
    service.getChannelByTeamAndUser(userId, teamId)
    {
      $rootScope.channel[] = channel[];
    };
    console.log(channel[]);
  };
});