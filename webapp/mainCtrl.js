slackCloneApp.controller('mainCtrl', function ($rootScope, $scope, $location, service) {
  console.log('mainCtrl');
  /* STILL WORKING ON THIS
  if(! $rootScope.user) {
    var userId = service.getSavedUserId();
    if(userId) {
      service.getUser(userId, function(user) {
        $rootScope.user = user;
      });
    }
  }
  */
  if ($rootScope.user) {
    $location.path("/messages");
  }
  else {
    $location.path("/login");
  }
});

slackCloneApp.controller('loginCtrl', function ($rootScope, $scope, $location, service) {
  console.log('loginCtrl');
  $scope.login = function () {
    service.getUserByLogin($scope.name, $scope.password)
      .then((user) => {
        $rootScope.user = user;
        if ($rootScope.user) {
          service.getFirstTeam(user.id)
            .then((team) => {
              if (!team) {
                alert('No team found for user ID ' + user.id + '!');
              }
              else {
                service.getFirstChannel(team.id, user.id)
                  .then((channel) => {
                    $rootScope.team = team;
                    $rootScope.channel = channel;
                    if (team && channel) {
                      $location.path('/messages');
                      $scope.$apply();
                    }
                    else {
                      alert('No channel found for user ID ' + user.id + '!');
                    }
                  },
                  (err) => {
                    alert(err);
                  });
              }
            },
            (err) => {
              alert(err);
            });
        }
        else {
          alert('Invalid login!');
        }
      },
      (err) => {
        alert(err);
      });
  }
})