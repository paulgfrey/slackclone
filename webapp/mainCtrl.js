slackCloneApp.controller('mainCtrl', function ($rootScope, $scope, $location, service) {
  console.log('mainCtrl');
  if ($rootScope.user) {
    $location.path("/messages/" + service.getCurrentChannel().id);
  }
  else {
    $location.path("/login");
  }
});

slackCloneApp.controller('loginCtrl', function ($rootScope, $scope, $location, service) {
  console.log('loginCtrl');
  $scope.login = function () {
    service.getUserByLogin($scope.name, $scope.password, function (user) {
      $rootScope.user = user;
      if ($rootScope.user) {
        service.getFirstTeam(user.id, function (team) {
          if (!team || team.length == 0) {
            alert('No team found for user ID ' + user.id + '!');
          }
          else {
            service.getFirstChannel(team.id, user.id, function (channel) {
              $rootScope.team = team;
              $rootScope.channel = channel;
              if (team && channel) {
                $location.path("/messages");
              }
              else {
                alert('No channel found for user ID ' + user.id + '!');
              }
            });
          }
        });
      }
      else {
        alert("Invalid login!");
      }
    });
  };
});