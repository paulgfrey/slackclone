slackCloneApp.controller('channelsCtrl', function ($rootScope, $scope, $location, service) {
  console.log('channelsCtrl');
service.getChannels($rootScope.team.id,$rootScope.user.id)
  .then((channels) => {
    $scope.channels = channels;
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
   

 }
});