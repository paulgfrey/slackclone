slackCloneApp.controller('channelMsgsCtrl', function ($rootScope, $scope, $location, $timeout, $interval, service) {
  $scope.glued = true;

  $scope.updateMessagePanel = function () {
    service.getMsgs($rootScope.channel.id)
      .then((messages) => {
        if (!$scope.messages) {
          $scope.messages = [];
        }
        //$scope.messages = [];
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
          messages[i].timeStamp = new Date(messages[i].timeStamp);
          (function () {
            var j = i;
            service.getUser(messages[j].userId).then((retrievedUserID) => {
              console.log("Retrieved User Name is: " + retrievedUserID.name);
              $scope.messages.push({
                id: messages[j].id,
                timeStamp: messages[j].timeStamp,
                userName: retrievedUserID.name,
                message: messages[j].message,
                displayed: true
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
      }, 250);
    };
    $rootScope.msgTimer();
  }
});