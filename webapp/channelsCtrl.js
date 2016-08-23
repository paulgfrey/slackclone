slackCloneApp.controller('channelsCtrl', function ($rootScope, $scope, $location, service) {
  console.log('channelsCtrl');

  //Populate Teams
  service.getTeams($rootScope.user.id).then((teamsList)=> {
      $scope.teams = teamsList;
  });

$scope.setCurrentChannel = function (teamId, userId, channelId) {
  console.log(channelId);
  service.getChannels($rootScope.team.id,$rootScope.user.id)
  .then((channels) => {
    $scope.channels = channels;
    for(var i = 0; i < channels.length; i++) {
      if(channels[i].id === channelId) {
        $rootScope.channel = channels[i];
        $scope.$emit('ChannelChanged');
        break;
      }
    }
  })    
 };

 $scope.setCurrentTeam = function(team){
   console.log(team);
   $rootScope.team = team;
   service.getFirstChannel(team.id, $rootScope.user.id)
    .then((channel) => {
      $rootScope.channel = channel;
      $scope.updateChannels();
      $scope.$emit('ChannelChanged');
    });
 }

 $scope.updateChannels = function()
 {
  service.getChannels($rootScope.team.id,$rootScope.user.id)
  .then((channels) => {
    $scope.channels = channels;
  });
 }

 $scope.updateChannels();

});