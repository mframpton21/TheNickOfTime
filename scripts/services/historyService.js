var app = angular.module('nickOfTime');

app.service('historyService', function(userService, $firebase) {

	////////////////////////////////////////////////////////////////
  this.getHistory = function () {

  	var userInfo = userService.getUserInfo();
    
    var url = userService.getEnv().firebase + '/users/' + userInfo.uid + '/dates/';

    return $firebase(new Firebase(url));
    
  };

  ////////////////////////////////////////////////////////////////

});	