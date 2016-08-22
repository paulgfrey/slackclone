slackCloneApp.controller('channelMsgsCtrl', function ($rootScope, $scope, $location, $timeout, $route, service) {
  console.log('channelMsgsCtrl');
  $scope.messages = [];
  service.getMsgs($rootScope.channel.id)
    .then((messages) => {
      //var tempMessageList = []; 
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
    });
  $scope.postMessage = function (newMessage) {
    console.log("Enterting Post Message: " + newMessage);
    var channelId = $rootScope.channel.id;
    var userId = $rootScope.user.id;
    service.postMsg(channelId, userId, newMessage, function () {
      console.log("In call back");
      $timeout(function () {
        // Any code in here will automatically have an $scope.apply() run afterwards
        console.log("in Timeout callback");
        $route.reload();
        // And it just works!
      });
    });
  }

});