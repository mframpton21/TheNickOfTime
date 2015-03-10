var app = angular.module('nickOfTime');

app.service('historyService', function(userService, $firebase) {

	////////////////////////////////////////////////////////////////
  this.getHistory = function () {

  	var userInfo = userService.getUserInfo();
    
    var url = userService.getEnv().firebase + '/users/' + userInfo.uid + '/dates/';
    console.log(url);

    return $firebase(new Firebase(url));
    
  };

  ////////////////////////////////////////////////////////////////

});	