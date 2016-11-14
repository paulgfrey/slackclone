slackCloneApp.controller('channelMsgsCtrl', function ($rootScope, $scope, $location, $timeout, $interval, service) {
  $scope.glued = true;

  $scope.updateMessagePanel = function () {
    service.getMsgs($rootScope.channel.id)
      .then((messages) => {
        if (!$scope.messages) {
          $scope.messages = [];
        }
        for (var i = 0; i < messages.length; i++) {
          var msgFound = false;
          for (var x = 0; x < $scope.messages.length && !msgFound; x++) {
            if (messages[i].id === $scope.messages[x].id) {
              msgFound = true;
            }
          }
          if (msgFound) {
            continue;
          }
          var newMsg = messages[i];
          newMsg.timeStamp = new Date(newMsg.timeStamp);
          var user = service.getCachedUser(newMsg.userId);
          newMsg.userName = user.name;
          newMsg.avatarImg = user.avatarImg;
          $scope.messages.push(newMsg);
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
    $scope.newMessage = "";
    document.getElementById("inputTextBox").value = "";
  }
  console.log('channelMsgsCtrl');

  $scope.updateMessagePanel();
  $scope.$on('ChannelChanged', function () {
    $scope.messages = [];
    $scope.updateMessagePanel();
  });

  if (!$rootScope.msgTimer) {
    $rootScope.msgTimer = function () {
      //Initialize the Timer to run every 1000 milliseconds i.e. one second.
      console.log('Initializing the Timer to run every second.');
      $scope.timer = $interval(function () {
        $scope.updateMessagePanel();
      }, 1000);
    };
    $rootScope.msgTimer();
  }
  
});