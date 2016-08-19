slackCloneApp.controller('channelMsgsCtrl', function ($rootScope, $scope, $location, service) {
  console.log('channelMsgsCtrl');
  service.getMsgs($rootScope.channel.id)
  .then((messages) => {
    $scope.messages = messages;
  });
});