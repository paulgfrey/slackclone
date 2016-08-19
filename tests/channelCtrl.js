slackClone.controller('channelCtrl', function ($rootScope, $scope, service) {
 
  var userId = req.params.userId;
  var teamId = req.params.teamId;
  $scope.channels[] = function () {
    service.getChannelByTeamAndUser(userId, teamId )
	{
      $rootScope.channels[] = channels[];
     });
	  console.log(channels[]);
  };
});