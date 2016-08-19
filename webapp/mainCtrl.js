slackCloneApp.controller('mainCtrl', function ($rootScope, $scope, $location, service) {
  console.log('mainCtrl');

  $scope.handleUserInit = function (user) {
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
                service.saveUserId(user.id);
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

  var userId = service.getSavedUserId();
  if(userId) {
      service.getUser(userId)
        .then((user) => {
          $rootScope.user = user;
          $scope.handleUserInit($rootScope.user);
        });
  }
  $location.path('/login');
});

slackCloneApp.controller('loginCtrl', function ($rootScope, $scope, $location, service) {
  console.log('loginCtrl');
  $scope.login = function () {
    service.getUserByLogin($scope.name, $scope.password)
      .then((user) => {
        $rootScope.user = user;
        if ($rootScope.user) {
          $scope.handleUserInit($rootScope.user);
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