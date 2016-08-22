slackCloneApp.controller('channelMsgsCtrl', function ($rootScope, $scope, $location, $timeout, service) {
  $scope.glued = true;
  $scope.updateMessagePanel = function () {
    service.getMsgs($rootScope.channel.id)
      .then((messages) => {
        $scope.messages = [];
        //var tempMessageList = []; 
        $scope.messages = [];
        for (var i = 0; i < messages.length; i++) {
          console.log("Message's User ID: " + messages[i].userId);
          console.log("Message's content: " + messages[i].message);
          messages[i].timeStamp = new Date(messages[i].timeStamp);
          (function () {
            var j = i;
            service.getUser(messages[j].userId).then((retrievedUserID) => {
              console.log("Retrieved User Name is: " + retrievedUserID.name);
              $scope.messages.push({
                timeStamp: messages[j].timeStamp,
                userName: retrievedUserID.name,
                message: messages[j].message
              });
              $scope.$apply();
            });
          })();

        }
        $scope.$apply();
      });
  }

  $scope.postMessage = function (newMessage) {
    console.log("Enterting Post Message: " + newMessage);
    var channelId = $rootScope.channel.id;
    var userId = $rootScope.user.id;
    service.postMsg(channelId, userId, newMessage, function () {
      console.log("In call back");
      $timeout(function () {
        console.log("in Timeout callback");
        $scope.updateMessagePanel();
      });
    });
  }
  console.log('channelMsgsCtrl');

  $scope.messages = [];
  $scope.updateMessagePanel();
  $scope.$on('ChannelChanged', function() {
    $scope.updateMessagePanel();
  });

});