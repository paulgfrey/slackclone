slackCloneApp.controller('channelMsgsCtrl', function ($rootScope, $scope, $location, service) {
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
      //$scope.messages = messages;
      //$scope.messages = tempMessageList;
      /*  for(var j=0; j < messages.length; j++){
          $scope.messages[j].userName = userList[j];
        }
     */
    });
});

