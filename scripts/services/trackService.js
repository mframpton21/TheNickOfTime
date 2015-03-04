var app = angular.module('nickOfTime');

app.service('trackService', function(userService, $firebase) {

  ////////////////////////////////////////////////////////////////
  var firebaseUrl = userService.getEnv().firebase;
  //console.log(firebaseUrl);

  ////////////////////////////////////////////////////////////////
  this.getUserActivity = function () {
    return $firebase(new Firebase(firebaseUrl + '/activity'));
  };

  ////////////////////////////////////////////////////////////////
});
