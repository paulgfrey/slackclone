slackCloneApp.controller('channelMsgsCtrl', function ($rootScope, $scope, $location, service) {
  console.log('channelMsgsCtrl');
  service.getMsgs($rootScope.channel.id, function(messages) {
      $scope.messages = messages;
  })
});