slackCloneApp.controller('channelsCtrl', function ($rootScope, $scope, $location, service) {
  console.log('channelsCtrl');

  //Populate Teams
  service.getTeams($rootScope.user.id).then((teamsList) => {
    $scope.teams = teamsList;
    $scope.updateChannels();
  });

  $scope.setCurrentChannel = function (teamId, userId, channelId) {
    console.log(channelId);
    service.getChannels($rootScope.team.id, $rootScope.user.id)
      .then((channels) => {
        $scope.channels = channels;
        for (var i = 0; i < channels.length; i++) {
          if (channels[i].id === channelId) {
            $rootScope.channel = channels[i];
            $scope.$emit('ChannelChanged');
            break;
          }
        }
      })
  };

  $scope.setCurrentTeam = function (team) {
    console.log(team);
    $rootScope.team = team;
    service.getFirstChannel(team.id, $rootScope.user.id)
      .then((channel) => {
        $rootScope.channel = channel;
        $scope.updateChannels();
        $scope.$emit('ChannelChanged');
      });
  }

  $scope.updateChannels = function () {
    service.getChannels($rootScope.team.id, $rootScope.user.id)
      .then((channels) => {
        $scope.channels = channels;
      });
  }

  $scope.updateChannels();

  $scope.isTeamSelected = function (localTeam) {
    var returnString = "";
    if (localTeam.id === $rootScope.team.id) {
      returnString = "selectedItem";
    }

    return returnString;
  }

  $scope.isChannelSelected = function (channel) {
    var returnString = "";
    if (channel.id === $rootScope.channel.id) {
      returnString = "selectedItem";
    }

    return returnString;
  }

  $scope.setCurrenrtUser = function (userid) {

    console.log(userid);
    $rootScope.user = user;
    service.getUserProfileJSON(user.id, $rootScope.user.name)
      .then((name) => {
        $rootScope.user = user;
        console.log(name);
      });
  }

  $scope.insertChannel = function (newChannel) {
    console.log("Inserting Channel: " + newChannel);
    service.createChannel(newChannel, $rootScope.team.id).then(
      function (channelObj) {
        var channelId = channelObj.channelId;
        $scope.setCurrentChannel($rootScope.team.id, $rootScope.user.id, channelId);
        document.getElementById("inputChannelTextBox").value = "";
      });
  }

});