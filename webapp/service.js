var stackCloneApp = angular.module("stackCloneApp", []);
stackCloneApp.factory('service', function($http) {
    var user;
    return {
        getUser: function () {
            if(! user) {
                // show login dialog
                // Hard code for now
                user = { id: 1, name: "PAUL", password: "QWEWRER", email: "BRRTTS@GMAIL.COM" };
            }
            return(user);
        }
    };
});
   