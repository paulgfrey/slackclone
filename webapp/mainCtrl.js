slackCloneApp.controller('mainCtrl', function ($rootScope, $scope, $location, service) {
  console.log('mainCtrl');

  $scope.handleUserInit = function (user, remember) {
    service.getFirstTeam(user.id)
      .then((team) => {
        if (!team) {
          $scope.loginError = 'No team found for user ID ' + user.id + '!';
        }
        else {
          //Populate Channels Based on User Selecting the first team
          service.getFirstChannel(team.id, user.id)
            .then((channel) => {
              $rootScope.team = team;
              $rootScope.channel = channel;
              if (team && channel) {
                if (remember) {
                  service.saveUserId(user.id);
                }
                $location.path('/messages');
                $scope.$apply();
              }
              else {
                $scope.loginError = 'No channel found for user ID ' + user.id + '!';
              }
            },
            (err) => {
              $scope.loginError = err;
            });
        }
        $scope.$apply();
      },
      (err) => {
        $scope.loginError = err;
      });
  }

  var userId = service.getSavedUserId();
  if (userId) {
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
  if ($rootScope.user) {
    $scope.name = $rootScope.user.name;
  }
  if (service.getSavedUserId()) {
    $scope.remember = true;
  }

  $scope.login = function () {
    var remember = $scope.remember;
    service.getUserByLogin($scope.name, $scope.password)
      .then((user) => {
        $rootScope.user = user;
        if ($rootScope.user) {
          $scope.handleUserInit($rootScope.user, remember);
          if (!remember) {
            service.removeSavedUserId();
          }
        }
        else {
          $scope.loginError = ('Invalid login!');
          $scope.$apply();
        }
      },
      (err) => {
        $scope.loginError = (err);
        $scope.apply();
      });
  }
})

slackCloneApp.controller('newUserCtrl', function ($rootScope, $scope, $location, service) {
  console.log('newUserCtrl');
  $scope.name = undefined;
  $rootScope.user = undefined;
  $rootScope.team = undefined;
  $rootScope.channel = undefined;
  service.removeSavedUserId();

  service.getAllTeams()
    .then((teams) => {
      $scope.teams = teams;
      $scope.selectedTeam = teams[0];
      $scope.$apply();
    });

  $scope.createUser = function () {
    service.createUser($scope.name, $scope.password, $scope.email, $scope.selectedTeam.id)
      .then((user) => {
        service.reLoadAllUsers();
        service.getUser(user.userId)
          .then((user) => {
            $rootScope.user = user;
            $scope.handleUserInit($rootScope.user);
          }),
          (err) => {
            $scope.createUserError = (err);
            $scope.apply();
          }
      });
  }
})

