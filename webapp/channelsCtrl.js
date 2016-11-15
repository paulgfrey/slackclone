slackCloneApp.controller('channelsCtrl', function ($rootScope, $scope, $location, $interval, $timeout, service) {
  console.log('channelsCtrl');

  //Populate Teams
  service.getTeams($rootScope.user.id).then((teamsList) => {
    $scope.teams = teamsList;
    $scope.setCurrentTeam($scope.teams[0]);
    $scope.updateChannels();
  });

  $scope.setCurrentChannel = function (teamId, userId, channelId) {
    console.log(channelId);
    service.getChannels($rootScope.team.id, $rootScope.user.id)
      .then((channels) => {
        $scope.channels = channels;
        for (var i = 0; i < channels.length; i++) {
          if (channels[i].id === channelId) {
            // remove user from old channel
            if($rootScope.channel !== undefined) {
              service.removeUserFromChannel($rootScope.channel.id,
                    $rootScope.user.id);
            }
            $rootScope.channel = channels[i];
            service.addUserToChannel($rootScope.channel.id, $rootScope.user.id);
            $scope.$emit('ChannelChanged');
            break;
          }
        }
      })
  };

  $scope.setCurrentTeam = function (team) {
    console.log(team);
    $rootScope.team = team;
    if($rootScope.channel !== undefined) {
      service.removeUserFromChannel($rootScope.channel.id,
            $rootScope.user.id);
    }
    service.getFirstChannel(team.id, $rootScope.user.id)
      .then((channel) => {
        $rootScope.channel = channel;
        service.addUserToChannel($rootScope.channel.id,
            $rootScope.user.id);
        $scope.updateChannels();
        $scope.$emit('ChannelChanged');
      });
  }

  $scope.updateChannels = function () {
    service.getChannels($rootScope.team.id, $rootScope.user.id)
      .then((channels) => {
        if (!$rootScope.saveChannels) {
          $scope.channels = channels;
        }
        else {
          // Let's see if channels actually changed
          var channelFoundCount = 0;

          for(var i = 0; i < channels.length; i++) {
            for(var x = 0; x < $rootScope.saveChannels.length; x++) {
              if(channels[i].id === $rootScope.saveChannels[x].id) {
                channelFoundCount++;
                break;
              }
            }
          }
          if(channelFoundCount != channels.length) {
            $scope.channels = channels;            
          }
        }
        $rootScope.saveChannels = $scope.channels;
        $timeout(function(){
          $scope.$apply();
        });
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
        //document.getElementById("inputChannelTextBox").value = "";
        $scope.newChannel = "";
        $scope.$apply();
      });
  }

  $scope.updateChannelsDisp = function() {
    service.getChannelUsers().then((channelUsers) => {
      if(! channelUsers || ! $scope.channels) {
        return;
      }
      var channels = $scope.channels;
      var changeFound = false;
      for(var i = 0; i < channels.length; i++) {
        var channelId = channels[i].id;
        var total = 0;
        if(channelUsers[channelId] != undefined) {
          total = channelUsers[channelId].length;
        }
        if(! channels[i].total) {
          channels[i]['total'] = total;
          changeFound = true;
        }
        else {
          if(channels[i].total !== total) {
            changeFound = true;
          }
          channels[i].total = total;
        }
      }
      if(changeFound) {
        $timeout(function(){
            $scope.$apply();
        });
      }
    });
  }

  window.onbeforeunload = function (event) {
    if (typeof event == 'undefined') {
      event = window.event;
    }
    if(event) {
      if($rootScope.channel !== undefined) {
        service.removeUserFromChannel($rootScope.channel.id,
              $rootScope.user.id);
      }
    }
    /*
    var message = 'Are you sure you want to leave this page?';
    if (typeof event == 'undefined') {
      event = window.event;
    }
    if (event) {
      event.returnValue = message;
    }
    return message;
    */
  }

  if (!$rootScope.channelTimer) {
    $rootScope.channelTimer = function () {
      //Initialize the Timer to run every 1000 milliseconds i.e. one second.
      console.log('Initializing the Timer to run every second.');
      $scope.timer = $interval(function () {
        $scope.updateChannels();
      }, 5000);
    };
    $rootScope.channelTimer();
  }

  // Remove the user when they logout
  $scope.$on('$locationChangeStart', function( event ) {
    if($rootScope.channel !== undefined) {
      service.removeUserFromChannel($rootScope.channel.id,
            $rootScope.user.id);
    }
  });

  if (!$rootScope.channelUsersTimer) {
    $rootScope.channelUsersTimer = function () {
      //Initialize the Timer to run every 1000 milliseconds i.e. one second.
      console.log('Initializing the Timer to run every second.');
      $scope.timer = $interval(function () {
        $scope.updateChannelsDisp();
      }, 1000);
    };
    $rootScope.channelUsersTimer();
  }

});